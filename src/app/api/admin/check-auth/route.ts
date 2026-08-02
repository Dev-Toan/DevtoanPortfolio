import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";

/** Lets the dashboard know whether the current admin session is valid. */
export async function GET(request: NextRequest) {
  if (isAdminAuthed(request)) {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
