import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ClientReach.ai - AI Workforce for Clinics",
    short_name: "ClientReach.ai",
    description:
      "AI-powered client acquisition and lead generation platform for aesthetic, dental, and healthcare clinics",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/croped circle christmessssss.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
