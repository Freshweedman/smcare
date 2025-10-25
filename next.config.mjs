/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'sgi.e-boticario.com.br',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Para imagens genéricas temporárias
      },
    ],
  },
};

export default nextConfig;
