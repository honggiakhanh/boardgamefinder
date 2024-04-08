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
        pathname: "/tuotekuvat/**",
      },
      {
        protocol: "https",
        hostname: "z1.adlibris.com",
        port: "",
        pathname: "/35/**",
      },
      {
        protocol: "https",
        hostname: "z2.adlibris.com",
        port: "",
        pathname: "/35/**",
      },
      {
        protocol: "https",
        hostname: "cdn.verk.net",
        port: "",
        pathname: "/kuvastin/**",
      },
      {
        protocol: "https",
        hostname: "www.puolenkuunpelit.com",
        port: "",
        pathname: "/kauppa/**",
      },
    ],
  },
};

export default nextConfig;
