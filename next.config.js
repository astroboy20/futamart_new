/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ["res.cloudinary.com", "localhost", "api-cliqpod.koyeb.app"],
  },
};

module.exports = nextConfig;
