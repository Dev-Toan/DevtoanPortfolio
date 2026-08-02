/**
 * Lightweight User-Agent parser — no heavy libs.
 * Extracts browser, OS, and device type from the UA string.
 */

export interface ParsedUA {
  browser: string;
  os: string;
  device: "mobile" | "tablet" | "desktop";
}

export function parseUA(ua: string): ParsedUA {
  const uaLower = ua.toLowerCase();

  // --- Browser detection (check for Edge before Chrome — Edge UA contains "Chrome") ---
  let browser = "Other";

  if (uaLower.includes("edg/") || uaLower.includes("edge/")) {
    const m = ua.match(/edg\/([\d.]+)/i) || ua.match(/edge\/([\d.]+)/i);
    browser = m ? `Edge ${m[1]}` : "Edge";
  } else if (uaLower.includes("opr/") || uaLower.includes("opera/")) {
    const m = ua.match(/opr\/([\d.]+)/i);
    browser = m ? `Opera ${m[1]}` : "Opera";
  } else if (uaLower.includes("firefox/")) {
    const m = ua.match(/firefox\/([\d.]+)/i);
    browser = m ? `Firefox ${m[1]}` : "Firefox";
  } else if (uaLower.includes("safari/") && !uaLower.includes("chrome/")) {
    const m = ua.match(/version\/([\d.]+).*safari/i);
    browser = m ? `Safari ${m[1]}` : "Safari";
  } else if (uaLower.includes("chrome/")) {
    const m = ua.match(/chrome\/([\d.]+)/i);
    browser = m ? `Chrome ${m[1]}` : "Chrome";
  } else if (uaLower.includes("trident/") || uaLower.includes("msie ")) {
    const m = ua.match(/(?:rv:|msie )([\d.]+)/i);
    browser = m ? `IE ${m[1]}` : "IE";
  }

  // --- OS detection ---
  let os = "Unknown";

  if (uaLower.includes("windows nt")) {
    const m = ua.match(/windows nt ([\d.]+)/i);
    if (m) {
      const versionMap: Record<string, string> = {
        "10.0": "Windows 10/11",
        "6.3": "Windows 8.1",
        "6.2": "Windows 8",
        "6.1": "Windows 7",
        "6.0": "Windows Vista",
      };
      os = versionMap[m[1]] || `Windows ${m[1]}`;
    } else {
      os = "Windows";
    }
  } else if (uaLower.includes("mac os x") || uaLower.includes("macintosh")) {
    const m = ua.match(/mac os x\s+([\d_]+)/i);
    if (m) {
      os = `macOS ${m[1].replace(/_/g, ".")}`;
    } else {
      os = "macOS";
    }
  } else if (uaLower.includes("android")) {
    const m = ua.match(/android ([\d.]+)/i);
    os = m ? `Android ${m[1]}` : "Android";
  } else if (uaLower.includes("iphone") || uaLower.includes("ipad") || uaLower.includes("ipod")) {
    const m = ua.match(/os ([\d_]+)\s/);
    if (m) {
      os = `iOS ${m[1].replace(/_/g, ".")}`;
    } else {
      os = "iOS";
    }
  } else if (uaLower.includes("linux")) {
    os = "Linux";
  } else if (uaLower.includes("cros")) {
    os = "ChromeOS";
  }

  // --- Device detection ---
  let device: "mobile" | "tablet" | "desktop" = "desktop";
  if (uaLower.includes("ipad") || (uaLower.includes("android") && !uaLower.includes("mobile"))) {
    device = "tablet";
  } else if (
    uaLower.includes("mobile") ||
    uaLower.includes("iphone") ||
    uaLower.includes("ipod")
  ) {
    device = "mobile";
  }

  return { browser, os, device };
}
