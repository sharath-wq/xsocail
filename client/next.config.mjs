/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.freepik.com', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    reactStrictMode: false,
    env: {
        ZEGO_CLOUD_SERVER_SECRET: process.env.ZEGO_CLOUD_SERVER_SECRET,
    },
};

export default nextConfig;
