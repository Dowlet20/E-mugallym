/** @type {import('next').NextConfig} */
//import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://216.250.12.100:5000/api/:path*',
  //     },
  //   ];
  // },
  // async redirects() {
  //   return [];
  // },
  async headers() {
    return [
      {
        // Add the COOP header to all routes
        source: '/(.*)', // Matches all routes
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // You can change this based on your needs
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',  // Temporarily disable COEP
          },
          { 
            key: 'Access-Control-Allow-Origin', 
            value: '*' 
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET, POST, PUT, DELETE' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'Content-Type' 
          },
        //   { "key": "Access-Control-Allow-Credentials", "value": "true" },
        // { "key": "Access-Control-Allow-Origin", "value": "*" },
        // { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        // { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ],
      },
    ];
  },
  images: {
    domains: ['216.250.14.39','216.250.14.38', '216.250.12.100']
  },

  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/course-filter-two-toggle',
  //       permanent: true,
  //     },
  //   ];
  // },duzetmeli
};

export default nextConfig;
