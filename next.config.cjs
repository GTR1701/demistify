/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  experimental: {
    esmExternals: true
  }
};

const withMUI = require('./withMUI');

module.exports = withMUI();

module.exports = {
  async redirects() {
    return [
      {
        source: '/phpmyadmin',  // this path will be redirected to 404 
        destination: '/phpmyadmin/',
        permanent: true,
      },
    ]
  },
}