import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "alckor.dev",
    short_name: "alckor.dev",
    description: "Isco — Software developer",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      {
        src: "/images/iso.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
