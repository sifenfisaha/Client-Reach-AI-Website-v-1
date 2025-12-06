import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/ai-agents", "/discover", "/newsletter"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
