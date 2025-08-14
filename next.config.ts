import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wb7gwuxmj6xggxpr.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default withPayload(nextConfig);
