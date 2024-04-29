/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "en.lautapelit.fi",
      },
      {
        protocol: "https",
        hostname: "z1.adlibris.com",
      },
      {
        protocol: "https",
        hostname: "z2.adlibris.com",
      },
      {
        protocol: "https",
        hostname: "cdn.verk.net",
      },
      {
        protocol: "https",
        hostname: "www.puolenkuunpelit.com",
      },
      {
        protocol: "https",
        hostname: "cf.geekdo-images.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
