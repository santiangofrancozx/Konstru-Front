// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8082/:path*', // Cambia la URL al servidor backend que necesites
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Cambia el valor de Access-Control-Allow-Origin según sea necesario
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = {
        proxy: {
          '/api': {
            target: 'http://localhost:8082', // Cambia la URL al servidor backend que necesites
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
