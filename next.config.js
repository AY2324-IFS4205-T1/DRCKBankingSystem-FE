/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  headers: () => {
    return [
      {
        source: '/api/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      }
    ]
  }
};

module.exports = nextConfig;
