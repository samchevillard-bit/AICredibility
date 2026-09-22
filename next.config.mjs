/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/**': ['./prisma/seed-data.db'],
    },
  },
};

export default nextConfig;
