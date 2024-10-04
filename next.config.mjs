/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'f1.dikidi.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'n1s1.hsmedia.ru',
      },
      {
        protocol: 'https',
        hostname: 'static-00.iconduck.com',
      },
      {
        protocol: 'http',
        hostname: '192.168.225.98'
      },
      {
        protocol: 'https',
        hostname: 'api.mybeautybooking.ru'
      },
    ],
  },

};

export default nextConfig;