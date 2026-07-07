import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type PathInput = string | { path: string; type?: "page" | "layout" };

type RevalidateBody = {
  tags?: string[];
  paths?: PathInput[];
};

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) return false;

  const header = request.headers.get("x-revalidate-secret");
  const query = request.nextUrl.searchParams.get("secret");
  return header === secret || query === secret;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const tags = body.tags ?? [];
  const paths = body.paths ?? [];

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  for (const entry of paths) {
    if (typeof entry === "string") {
      revalidatePath(entry);
      continue;
    }
    revalidatePath(entry.path, entry.type ?? "page");
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    paths,
    at: Date.now(),
  });
}
