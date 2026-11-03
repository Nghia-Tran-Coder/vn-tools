import type { MetadataRoute } from "next";
import { SITE_URL, TRANG_THONG_TIN } from "../lib/site";
import { TOOLS } from "../lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const cacTrang = [{ href: "" }, ...TOOLS, ...TRANG_THONG_TIN];
  return cacTrang.map((t) => ({ url: `${SITE_URL}${t.href}`, lastModified: now }));
}