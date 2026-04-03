import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/admin"],
      },
    ],
    sitemap: "https://themukesh.com/sitemap.xml",
    host: "https://themukesh.com",
  };
}
