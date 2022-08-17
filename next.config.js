/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  image: {
    domains: ["media.graphassets.com"],
  },
};

module.exports = nextConfig;
