/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
