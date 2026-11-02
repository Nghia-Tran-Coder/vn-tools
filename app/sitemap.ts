import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
import { TOOLS } from "../lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now },
    ...TOOLS.map((t) => ({ url: `${SITE_URL}${t.href}`, lastModified: now })),
  ];
}