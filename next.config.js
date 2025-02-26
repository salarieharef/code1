// next.config.js

const withPWA = require("next-pwa")({
  dest: "static",
  disable: process.env.ENV_STATUS !== "production",
  register: true,
  skipWaiting: true,
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
    instrumentationHook: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./utils/loader-file.ts",
    // unoptimized: true,
    remotePatterns:
      process.env.NODE_ENV === "production"
        ? undefined
        : [
            {
              protocol: "http",
              hostname: "**",
            },
            {
              protocol: "https",
              hostname: "**",
            },
          ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = withBundleAnalyzer(withPWA(withMDX(nextConfig)));
