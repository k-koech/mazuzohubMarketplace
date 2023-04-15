/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ['127.0.0.1'],
  // },
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        // pathname: '',
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        // port: '8000',
        // pathname: '',
      }
    ],
  },
}

// module.exports = { images: { domains: ['example.com'], formats: ['image/avif', 'image/webp'], }, }





module.exports = nextConfig
