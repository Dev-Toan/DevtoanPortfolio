import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { resetStats } from "@/lib/analytics";

// Never cache a mutation.
export const dynamic = "force-dynamic";

/** Wipes all visit analytics (counter + events list). Admin-cookie gated. */
export async function POST(request: NextRequest) {
  if (!isAdminAuthed(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const ok = await resetStats();
  if (!ok) {
    return NextResponse.json(
      { message: "Analytics store is not configured (missing Redis env vars)." },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
