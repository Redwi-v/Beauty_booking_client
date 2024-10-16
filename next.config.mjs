/** @type {import('next').NextConfig} */

const envConfig = {
  // API_URL: 'https://api.mybeautybooking.ru'


  // # dev

  API_URL: "https://beauty-back.ru.tuna.am",
}

const nextConfig = {
  reactStrictMode: false,
  env: {
    ...envConfig
  },
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
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'beauty-back.ru.tuna.am'
      },

      {
        protocol: 'https',
        hostname: 'api.mybeautybooking.ru'
      },
    ],
  },

};

export default nextConfig;