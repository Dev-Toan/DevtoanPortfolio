import { NextRequest, NextResponse, NextFetchEvent } from "next/server";
import { recordVisit } from "@/lib/analytics";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  // IP thật của visitor (Vercel đặt vào x-forwarded-for, IP đầu tiên là client).
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const country = request.headers.get("x-vercel-ip-country") ?? "-";
  const city = decodeCity(request.headers.get("x-vercel-ip-city"));
  const path = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") ?? "";
  const referrer = request.headers.get("referer") ?? "";

  // Bỏ qua các request KHÔNG phải là lượt xem trang thật của người dùng.
  // Next.js App Router tự động prefetch mọi <Link> trong viewport và điều hướng
  // phía client bằng RSC — mỗi cái đều đi qua middleware. Nếu đếm hết, một
  // visitor mở 1 trang sẽ bị nhân lên hàng chục lần (đây là lý do 1 lượt hiện 43).
  const h = request.headers;
  const isPrefetch =
    h.get("next-router-prefetch") === "1" ||
    h.get("x-middleware-prefetch") === "1" ||
    h.get("purpose") === "prefetch" ||
    h.get("x-purpose") === "prefetch" ||
    h.get("x-moz") === "prefetch" ||
    (h.get("sec-purpose")?.includes("prefetch") ?? false);
  // RSC = 1 nghĩa là request lấy React Server Component (prefetch hoặc soft-nav),
  // không phải lần tải trang đầy đủ. Chỉ đếm khi header này vắng mặt.
  const isRSC = h.get("rsc") === "1";

  // Không thống kê chính trang admin để tránh làm nhiễu số liệu.
  const isAdmin = path === "/admin" || path.startsWith("/admin/");

  // Không đếm traffic của chính chủ site. Khi đã đăng nhập admin, request mang
  // cookie adminToken=authenticated — bỏ qua MỌI trang họ duyệt, không chỉ /admin,
  // để lượt xem của mình khi kiểm tra/điều hướng site không thổi phồng số liệu.
  const isAdminUser = request.cookies.get("adminToken")?.value === "authenticated";

  if (!isAdmin && !isAdminUser && !isPrefetch && !isRSC) {
    // Ghi mỗi visit vào Redis — fire-and-forget, không chặn việc trả trang.
    event.waitUntil(
      recordVisit({
        ip,
        country,
        city,
        path,
        userAgent,
        referrer,
        selfHost: request.nextUrl.hostname,
        now: Date.now(),
      }),
    );

    // Vẫn giữ log ra Vercel Function Logs để tiện debug.
    console.log(`[visitor] ip=${ip} country=${country} city=${city} path=${path}`);
  }

  return NextResponse.next();
}

// Vercel city header có thể được URL-encode (vd. "Ho%20Chi%20Minh").
function decodeCity(city: string | null): string {
  if (!city) return "-";
  try {
    return decodeURIComponent(city);
  } catch {
    return city;
  }
}

// Chỉ chạy trên các trang thật, bỏ qua static assets, _next, favicon và /api.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
