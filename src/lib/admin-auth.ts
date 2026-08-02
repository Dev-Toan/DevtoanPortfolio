import { NextRequest } from "next/server";
import * as cookie from "cookie";

/** True when the request carries a valid admin session cookie. */
export function isAdminAuthed(request: NextRequest): boolean {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  return cookies.adminToken === "authenticated";
}
