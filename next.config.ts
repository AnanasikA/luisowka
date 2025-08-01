const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
  },
  env: {
    NEXT_PUBLIC_ADMIN_USER: process.env.NEXT_PUBLIC_ADMIN_USER,
    NEXT_PUBLIC_ADMIN_PASS: process.env.NEXT_PUBLIC_ADMIN_PASS,
  },
};

module.exports = nextConfig;

