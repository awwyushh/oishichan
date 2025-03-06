/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.themealdb.com",
                pathname: "/images/media/meals/**",
                
            },
        ],
        domains: ['www.themealdb.com'],
  },
};


export default nextConfig;
