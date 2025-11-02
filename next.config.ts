import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // R:\test\apps\docs

// import type { NextConfig } from "next";7
/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  turbopack: { root: path.resolve(__dirname, "../../") }, // R:\test
  //  pageExtensions: [
  //       "page.tsx",
  //       "page.ts",
        // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
        // Instead, use `not-found.ts`as a workaround
        // "ts" is required to resolve `not-found.ts`
        // https://github.com/vercel/next.js/issues/65447
    //     "ts"
    // ],
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //      loader: 'ts-loader',
  //       options: {
  //         transpileOnly: true
  //       }
  //     }
  // ],
  images: {
    remotePatterns: [
        {
        protocol: "https",
        hostname: "images.pexels.com",
      },
        {
        protocol: 'https',
        hostname: 'aubvbrlscmmlygjlapzn.supabase.co',
        },
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
    ],
  },
};

export default nextConfig;