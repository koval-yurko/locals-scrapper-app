import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // pageExtensions: ['page.tsx', 'page.ts'],
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
