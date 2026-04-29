import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.16.1'],
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
