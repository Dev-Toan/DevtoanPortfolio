import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // IP thật của visitor (Vercel đặt vào x-forwarded-for, IP đầu tiên là client).
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const country = request.headers.get("x-vercel-ip-country") ?? "-";
  const city = request.headers.get("x-vercel-ip-city") ?? "-";
  const path = request.nextUrl.pathname;

  // Ghi ra Vercel Function Logs cho MỌI trang visitor mở.
  console.log(`[visitor] ip=${ip} country=${country} city=${city} path=${path}`);

  return NextResponse.next();
}

// Chỉ chạy trên các trang thật, bỏ qua static assets, _next, favicon và /api.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
