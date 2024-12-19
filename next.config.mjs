/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io', // Replace with the hostname of your image URLs
        pathname: '/v1/storage/buckets/**', // Adjust path if needed
      },
    ],
  },
};

export default nextConfig;
