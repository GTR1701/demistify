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