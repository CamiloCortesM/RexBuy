/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    }
  },
    images: {
      unoptimized: true
  }
};

module.exports = nextConfig;
