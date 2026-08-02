import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  // Trên Vercel, IP thật của visitor nằm trong x-forwarded-for (IP đầu tiên).
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const geo = {
    country: request.headers.get("x-vercel-ip-country"),
    region: request.headers.get("x-vercel-ip-country-region"),
    city: request.headers.get("x-vercel-ip-city"),
  };

  // Ghi ra Vercel Function Logs để xem lại về sau.
  console.log(`[visitor] ip=${ip} country=${geo.country ?? "-"} city=${geo.city ?? "-"}`);

  return NextResponse.json({ ip, geo });
}
