import type { NextConfig } from "next";

const apiBase = (process.env.NEXT_PUBLIC_API_URL || "https://api.adeptos.ai").replace(
  /\/$/,
  "",
);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/__adeptos-api/:path*/",
        destination: `${apiBase}/:path*`,
      },
      {
        source: "/__adeptos-api/:path*",
        destination: `${apiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
