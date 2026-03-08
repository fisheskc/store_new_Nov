// /** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */

import  { NextConfig } from 'next'
// import type { NextConfig } from 'next';
import { Configuration } from 'webpack';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

  /* config options here */
  // reactStrictMode: true,
  // turbopack: { root: path.resolve(__dirname, "../../") }, // R:\test
  //  pageExtensions: [
  //       "page.tsx",
  //       "page.ts",
        // FIXME: Next.js has a bug which does not resolve not-found.page.tsx correctly
        // Instead, use `not-found.ts`as a workaround
        // "ts" is required to resolve `not-found.ts`
        // https://github.com/vercel/next.js/issues/65447
    //     "ts"
    // ],
const nextConfig: NextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  webpack: (config: Configuration) => {
    // Suppress source map warnings from node_modules
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules/, message: /Failed to parse source map/ }
    ];
    return config;
  },


  turbopack: {},
  
  images: {
    remotePatterns: [
        {
        protocol: "https",
        hostname: "images.pexels.com",
      },
        {
        protocol: 'https',
        // hostname: "316RIYY50Q14v1B5UtBziVp8E9j.supabase.co",
        // hostname: "aubvbrlscmmlygjlapzn.supabase.co",
        hostname: "aonhlpvxxlmdeinyrnca.supabase.co",
        port: '',
        pathname: '/**',
        },
        {
          protocol: "https",
          hostname: "img.clerk.com",
        },
    ]
  }
};

export default nextConfig;