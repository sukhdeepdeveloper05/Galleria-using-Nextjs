/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        port: "",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
