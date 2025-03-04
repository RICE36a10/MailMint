/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**", // Allows images from any domain
            },
        ]
    },
};

export default nextConfig;
