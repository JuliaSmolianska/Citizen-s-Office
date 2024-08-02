import withPWA from "next-pwa";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "components"),
      "@APIrest": path.resolve(__dirname, "APIrest"),
      "@hooks": path.resolve(__dirname, "hooks"),
      "@app": path.resolve(__dirname, "app"),
    };

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'], // Додано для дозволу зовнішніх доменів
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(nextConfig);
