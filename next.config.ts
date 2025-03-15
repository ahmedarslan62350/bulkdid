import type { NextConfig } from "next";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(new MiniCssExtractPlugin());
    config.externals = config.externals || [];
    config.externals.push({
      "osx-temperature-sensor": "commonjs osx-temperature-sensor",
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
