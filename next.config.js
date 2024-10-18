/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.com",
        pathname: "/image-cdn/images/**",
      },
    ],
    domains: [
      "res.cloudinary.com",
      "localhost",
      "api.futamart.com",
      "logo.com",
    ],
  },
};

module.exports = nextConfig;
