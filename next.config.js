/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
