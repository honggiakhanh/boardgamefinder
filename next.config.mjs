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
        port: "",
      },
      {
        protocol: "https",
        hostname: "z1.adlibris.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "z2.adlibris.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.verk.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.puolenkuunpelit.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
