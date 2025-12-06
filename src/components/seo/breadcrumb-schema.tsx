"use client";

import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientreach.ai";

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    if (items.length === 0) return;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(breadcrumbSchema);
    script.id = "breadcrumb-schema";
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("breadcrumb-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [items]);

  return null;
}
