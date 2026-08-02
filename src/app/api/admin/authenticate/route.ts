import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";

/**
 * Admin login — separate from the site's PAGE_ACCESS_PASSWORD.
 * Checks ADMIN_PASSWORD and, on success, sets an httpOnly `adminToken` cookie
 * that /api/admin/* and the /admin dashboard use to gate access.
 */
export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  if (password !== correctPassword) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("adminToken", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8h admin session
      sameSite: "strict",
      path: "/",
    }),
  );
  return response;
}
