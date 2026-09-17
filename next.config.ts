import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so a stray lockfile higher up the tree
  // does not break output file tracing.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
