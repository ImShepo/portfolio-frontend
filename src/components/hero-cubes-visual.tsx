"use client";

import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const W = 200;
const HW = W / 2;
const HH = W / 4;
const H = W / 2;
const CUBE_H = 210;
const GAP = 19;
const STEP_X = HW + GAP;
const STEP_Y = HH + GAP / 2;

/** Back (col 0) tallest → middle (col 1) → front (col 2) shortest — height only */
const COL_CUBE_HEIGHT = [210, 163, 116] as const;

function cubeHeight(col: number) {
  return COL_CUBE_HEIGHT[col] ?? CUBE_H;
}

const ORIGIN_X = 220;
const ORIGIN_Y = 0;

/** Shared floor plane — front-row cube bases */
const FLOOR_Y = 408;
const REFLECTION_H = 96;

const CUBES = [
  { col: 0, row: 0 },
  { col: 1, row: 0 },
  { col: 2, row: 0 },
  { col: 0, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
] as const;

/** Only gaps between adjacent cubes — no exterior edge at col 2.5 */
const COLUMN_GLOWS = [
  { col: 0.5, row: 0 },
  { col: 1.5, row: 0 },
  { col: 0.5, row: 1 },
  { col: 1.5, row: 1 },
] as const;

const GAP_GLOW = "rgba(91, 143, 255, 0.8)";
const AURA_FILL = "rgba(91, 143, 255, 0.14)";
const AURA_STROKE = "rgba(91, 143, 255, 0.44)";
const REFLECTION_BASE_OPACITY = 0.42;
const REFLECTION_DARK_OPACITY = 0.38;
/** Nudge mirror plane up so reflection meets cube base without a visible gap */
const REFLECTION_SEAM_LIFT = 43;

/** Unified glow fade — all effects dim together, early in hero scroll */
const SCROLL_GLOW_FADE = { start: 0.06, end: 0.48 } as const;

function cubePosition(col: number, row: number) {
  const cx = ORIGIN_X + col * STEP_X - row * STEP_X;
  const gridCy = ORIGIN_Y + col * STEP_Y + row * STEP_Y;
  const cy = gridCy + CUBE_H - cubeHeight(col);
  return { cx, cy };
}

function topPath(cx: number, cy: number) {
  return `M ${cx} ${cy} L ${cx + HW} ${cy + HH} L ${cx} ${cy + H} L ${cx - HW} ${cy + HH} Z`;
}

function leftPath(cx: number, cy: number, cubeH: number) {
  return `M ${cx - HW} ${cy + HH} L ${cx} ${cy + H} L ${cx} ${cy + H + cubeH} L ${cx - HW} ${cy + HH + cubeH} Z`;
}

function rightPath(cx: number, cy: number, cubeH: number) {
  return `M ${cx} ${cy + H} L ${cx + HW} ${cy + HH} L ${cx + HW} ${cy + HH + cubeH} L ${cx} ${cy + H + cubeH} Z`;
}

function columnGlowPath(col: number, row: number) {
  const { cx, cy } = cubePosition(col, row);
  const halfGap = GAP / 2;
  const leftCol = Math.floor(col);
  const rightCol = Math.ceil(col);
  const sharedH = Math.min(cubeHeight(leftCol), cubeHeight(rightCol));
  const top = cy + HH;
  const bottom = cy + HH + sharedH;

  return `M ${cx - halfGap} ${top} L ${cx + halfGap} ${top + HH} L ${cx + halfGap} ${bottom - HH} L ${cx - halfGap} ${bottom} Z`;
}

function scalePoint(
  x: number,
  y: number,
  originX: number,
  originY: number,
  scale: number,
) {
  return {
    x: originX + (x - originX) * scale,
    y: originY + (y - originY) * scale,
  };
}

function cubeSilhouettePoints(cx: number, cy: number, cubeH: number) {
  return [
    { x: cx, y: cy },
    { x: cx - HW, y: cy + HH },
    { x: cx - HW, y: cy + HH + cubeH },
    { x: cx, y: cy + H + cubeH },
    { x: cx + HW, y: cy + HH + cubeH },
    { x: cx + HW, y: cy + HH },
  ];
}

function cubeSilhouettePath(cx: number, cy: number, cubeH: number, scale = 1) {
  const originY = cy + HH + cubeH * 0.42;
  const points = cubeSilhouettePoints(cx, cy, cubeH).map((point) =>
    scalePoint(point.x, point.y, cx, originY, scale),
  );

  return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} L ${points[3].x} ${points[3].y} L ${points[4].x} ${points[4].y} L ${points[5].x} ${points[5].y} Z`;
}

function CubeEdgeAura({ cx, cy, cubeH }: { cx: number; cy: number; cubeH: number }) {
  return (
    <path
      d={cubeSilhouettePath(cx, cy, cubeH)}
      fill="none"
      stroke={AURA_STROKE}
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}

function reflectFills(tone: "light" | "dark") {
  const suffix = tone === "dark" ? "-dark" : "";
  return {
    top: `url(#cube-top-reflect${suffix})`,
    left: `url(#cube-left-reflect${suffix})`,
    right: `url(#cube-right-reflect${suffix})`,
  };
}

function IsometricCube({
  cx,
  cy,
  cubeH,
  reflecting = false,
  reflectTone = "light",
  auraOpacity,
}: {
  cx: number;
  cy: number;
  cubeH: number;
  reflecting?: boolean;
  reflectTone?: "light" | "dark";
  auraOpacity?: MotionValue<number>;
}) {
  const top = topPath(cx, cy);
  const left = leftPath(cx, cy, cubeH);
  const right = rightPath(cx, cy, cubeH);
  const fills = reflectFills(reflectTone);

  const AuraWrap = motion.g;
  const auraStyle = auraOpacity ? { opacity: auraOpacity } : { opacity: 1 };

  return (
    <g>
      {!reflecting && (
        <AuraWrap style={auraStyle}>
          <path
            d={cubeSilhouettePath(cx, cy, cubeH, 1.1)}
            fill={AURA_FILL}
            filter="url(#edge-aura-blur)"
          />
          <path
            d={cubeSilhouettePath(cx, cy, cubeH, 1.04)}
            fill="none"
            stroke={AURA_STROKE}
            strokeWidth="3.2"
            opacity="0.5"
            filter="url(#edge-aura-soft)"
          />
        </AuraWrap>
      )}
      <path
        d={left}
        fill={reflecting ? fills.left : "url(#cube-left)"}
      />
      <path
        d={right}
        fill={reflecting ? fills.right : "url(#cube-right)"}
      />
      <path
        d={top}
        fill={reflecting ? fills.top : "url(#cube-top)"}
      />
      {!reflecting && (
        <AuraWrap style={auraStyle}>
          <CubeEdgeAura cx={cx} cy={cy} cubeH={cubeH} />
        </AuraWrap>
      )}

      <line
        x1={cx - HW}
        y1={cy + HH}
        x2={cx + HW}
        y2={cy + HH}
        stroke={
          reflecting
            ? reflectTone === "dark"
              ? "rgba(91, 143, 255, 0.22)"
              : "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.06)"
        }
        strokeWidth="0.7"
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy + H}
        stroke={
          reflecting
            ? reflectTone === "dark"
              ? "rgba(91, 143, 255, 0.22)"
              : "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.06)"
        }
        strokeWidth="0.7"
      />
      <path
        d={`M ${cx} ${cy} L ${cx + HW} ${cy + HH} L ${cx} ${cy + HH} Z`}
        fill={reflecting && reflectTone === "dark" ? "rgba(91, 143, 255, 0.1)" : "rgba(255,255,255,0.025)"}
      />
      <path
        d={`M ${cx} ${cy + HH} L ${cx + HW} ${cy + HH} L ${cx} ${cy + H} Z`}
        fill={reflecting && reflectTone === "dark" ? "rgba(91, 143, 255, 0.06)" : "rgba(0,0,0,0.07)"}
      />
    </g>
  );
}

function sortedCubes() {
  return [...CUBES].sort((a, b) => a.col + a.row - (b.col + b.row));
}

function cubeFloorY(col: number, row: number) {
  const { cy } = cubePosition(col, row);
  return cy + H + cubeHeight(col) - REFLECTION_SEAM_LIFT;
}

function reflectionDepth(floorY: number) {
  return Math.min(REFLECTION_H + 12, 560 - floorY);
}

function MirrorCubeReflection({
  col,
  row,
  opacity,
  reflectTone,
}: {
  col: number;
  row: number;
  opacity: number | MotionValue<number>;
  reflectTone: "light" | "dark";
}) {
  const { cx, cy } = cubePosition(col, row);
  const cubeH = cubeHeight(col);
  const floorY = cubeFloorY(col, row);
  const clipId = `mirror-clip-${col}-${row}`;
  const maskId = `mirror-mask-${col}-${row}`;

  return (
    <g clipPath={`url(#${clipId})`} mask={`url(#${maskId})`}>
      <motion.g
        style={{ opacity }}
        transform={`translate(0 ${floorY}) scale(1 -1) translate(0 ${-floorY})`}
      >
        <IsometricCube cx={cx} cy={cy} cubeH={cubeH} reflecting reflectTone={reflectTone} />
      </motion.g>
    </g>
  );
}

function MirrorReflections({
  reflectionOpacity,
  reflectTone,
}: {
  reflectionOpacity: number | MotionValue<number>;
  reflectTone: "light" | "dark";
}) {
  return (
    <>
      {sortedCubes().map((cube) => (
        <MirrorCubeReflection
          key={`refl-${cube.col}-${cube.row}`}
          col={cube.col}
          row={cube.row}
          opacity={reflectionOpacity}
          reflectTone={reflectTone}
        />
      ))}
    </>
  );
}

type HeroCubesVisualProps = {
  scrollProgress?: MotionValue<number>;
};

export function HeroCubesVisual({ scrollProgress }: HeroCubesVisualProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const staticProgress = useMotionValue(0);
  const progress = scrollProgress && !reduceMotion ? scrollProgress : staticProgress;
  const scrollEnabled = Boolean(scrollProgress) && !reduceMotion;

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";
  const reflectTone = isDark ? "dark" : "light";
  const reflectionPeakOpacity = isDark ? REFLECTION_DARK_OPACITY : REFLECTION_BASE_OPACITY;

  const glowIntensity = useTransform(
    progress,
    [0, SCROLL_GLOW_FADE.start, SCROLL_GLOW_FADE.end, 1],
    [1, 1, 0, 0],
    { clamp: true },
  );
  const reflectionOpacity = useTransform(
    glowIntensity,
    (value) => value * reflectionPeakOpacity,
  );
  const gapGlowOpacity = glowIntensity;
  const edgeAuraOpacity = glowIntensity;

  const GapWrap = motion.g;

  return (
    <div className="hero-cubes" aria-hidden>
      <svg
        viewBox="0 0 560 560"
        className="hero-cubes__svg"
        role="presentation"
      >
        <defs>
          <linearGradient id="cube-top" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#32323f" />
            <stop offset="45%" stopColor="#1e1e2a" />
            <stop offset="100%" stopColor="#12121a" />
          </linearGradient>
          <linearGradient id="cube-left" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a1a24" />
            <stop offset="100%" stopColor="#0a0a10" />
          </linearGradient>
          <linearGradient id="cube-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e1e2a" />
            <stop offset="100%" stopColor="#0b0b12" />
          </linearGradient>

          <linearGradient id="cube-top-reflect" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#32323f" />
            <stop offset="45%" stopColor="#1e1e2a" />
            <stop offset="100%" stopColor="#12121a" />
          </linearGradient>
          <linearGradient id="cube-left-reflect" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a1a24" />
            <stop offset="100%" stopColor="#0a0a10" />
          </linearGradient>
          <linearGradient id="cube-right-reflect" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e1e2a" />
            <stop offset="100%" stopColor="#0b0b12" />
          </linearGradient>

          <linearGradient id="cube-top-reflect-dark" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#4a6a9e" />
            <stop offset="45%" stopColor="#3a5580" />
            <stop offset="100%" stopColor="#2a3f62" />
          </linearGradient>
          <linearGradient id="cube-left-reflect-dark" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#425f8c" />
            <stop offset="100%" stopColor="#283a58" />
          </linearGradient>
          <linearGradient id="cube-right-reflect-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#456490" />
            <stop offset="100%" stopColor="#2b4060" />
          </linearGradient>

          <filter id="edge-aura-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5.5" />
          </filter>
          <filter id="edge-aura-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>

          <clipPath id="glow-above-floor">
            <rect x="0" y="0" width="560" height={FLOOR_Y - 8} />
          </clipPath>

          <linearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.72" />
            <stop offset="55%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {CUBES.map(({ col, row }) => {
            const floorY = cubeFloorY(col, row);
            const depth = reflectionDepth(floorY);
            return (
              <g key={`mirror-defs-${col}-${row}`}>
                <clipPath id={`mirror-clip-${col}-${row}`}>
                  <rect x="0" y={floorY} width="560" height={depth} />
                </clipPath>
                <mask id={`mirror-mask-${col}-${row}`}>
                  <rect
                    x="0"
                    y={floorY}
                    width="560"
                    height={Math.min(REFLECTION_H, depth)}
                    fill="url(#reflection-fade)"
                  />
                </mask>
              </g>
            );
          })}
        </defs>

        <g className="hero-cubes__reflection-layer">
          <MirrorReflections
            reflectTone={reflectTone}
            reflectionOpacity={scrollEnabled ? reflectionOpacity : reflectionPeakOpacity}
          />
        </g>

        <g clipPath="url(#glow-above-floor)">
          <GapWrap style={{ opacity: scrollEnabled ? gapGlowOpacity : 1 }}>
            {COLUMN_GLOWS.map((glow) => (
              <path
                key={`gap-${glow.col}-${glow.row}`}
                d={columnGlowPath(glow.col, glow.row)}
                fill={GAP_GLOW}
              />
            ))}
          </GapWrap>
        </g>

        {sortedCubes().map((cube) => {
          const { cx, cy } = cubePosition(cube.col, cube.row);
          const cubeH = cubeHeight(cube.col);

          return (
            <IsometricCube
              key={`${cube.col}-${cube.row}`}
              cx={cx}
              cy={cy}
              cubeH={cubeH}
              auraOpacity={scrollEnabled ? edgeAuraOpacity : undefined}
            />
          );
        })}
      </svg>
    </div>
  );
}
