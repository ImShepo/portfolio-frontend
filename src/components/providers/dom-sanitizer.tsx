"use client";

/**
 * Removes extension-injected attributes from <body> after hydration.
 * Does not prevent hydration warnings — those are handled by suppressHydrationWarning on <body> in layout.tsx.
 * Common sources: ColorZilla (cz-shortcut-listen), Grammarly, LanguageTool, etc.
 */
import { useEffect } from "react";

const ALLOWED_BODY_ATTRIBUTES = new Set([
  "class",
  "id",
  "style",
  "role",
  "dir",
  "lang",
  "tabindex",
]);

const ALLOWED_DATA_PREFIXES = ["data-app-", "data-testid", "data-theme"];
const ALLOWED_ARIA_PREFIX = "aria-";

const BLOCKED_ATTRIBUTES = new Set([
  "cz-shortcut-listen",
  "data-new-gr-c-s-check-loaded",
  "data-gr-ext-installed",
  "data-lt-installed",
]);

const BLOCKED_PREFIXES = ["data-gr-", "data-ext-", "data-extension-", "data-lt-"];

function isAllowedAttribute(name: string) {
  if (ALLOWED_BODY_ATTRIBUTES.has(name)) return true;
  if (name.startsWith(ALLOWED_ARIA_PREFIX)) return true;
  if (ALLOWED_DATA_PREFIXES.some((prefix) => name.startsWith(prefix))) return true;
  return false;
}

function isBlockedAttribute(name: string) {
  if (BLOCKED_ATTRIBUTES.has(name)) return true;
  if (BLOCKED_PREFIXES.some((prefix) => name.startsWith(prefix))) return true;
  if (name.startsWith("data-") && !isAllowedAttribute(name)) return true;
  return false;
}

function sanitizeBodyAttributes() {
  const body = document.body;
  if (!body) return;

  for (const attr of Array.from(body.attributes)) {
    const name = attr.name.toLowerCase();
    if (!isBlockedAttribute(name)) continue;
    body.removeAttribute(attr.name);
  }
}

export function DomSanitizer() {
  useEffect(() => {
    sanitizeBodyAttributes();

    const body = document.body;
    if (!body) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== "attributes") continue;
        if (!mutation.attributeName) continue;
        const attr = mutation.attributeName.toLowerCase();
        if (!isBlockedAttribute(attr)) continue;
        body.removeAttribute(mutation.attributeName);
      }
    });

    observer.observe(body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
