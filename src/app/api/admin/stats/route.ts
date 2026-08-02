import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getStats } from "@/lib/analytics";

// Always compute fresh from Redis; never cache the dashboard payload.
export const dynamic = "force-dynamic";

/** Returns aggregated visit analytics. Admin-cookie gated. */
export async function GET(request: NextRequest) {
  if (!isAdminAuthed(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const stats = await getStats();
  if (!stats) {
    return NextResponse.json(
      { message: "Analytics store is not configured (missing Redis env vars)." },
      { status: 503 },
    );
  }

  return NextResponse.json(stats, { status: 200 });
}
