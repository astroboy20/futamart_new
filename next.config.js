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
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**", 
      },
    ],
    domains: [
      "res.cloudinary.com",
      "localhost",
      "api.futamart.com",
      "logo.com",
      "media.istockphoto.com",
    ],
  },
};

module.exports = nextConfig;
