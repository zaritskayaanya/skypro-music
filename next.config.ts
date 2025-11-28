// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   source: '/',
//   destination: '/music/main',
//   permanent: true,
// };

// export default nextConfig;

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/music/main',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;