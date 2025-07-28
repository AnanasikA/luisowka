/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
   images: {
    unoptimized: true, 
    formats: ['image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
  },
};

module.exports = nextConfig;

