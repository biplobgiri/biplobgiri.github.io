/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This repo is deployed as a GitHub "user/org site" (username.github.io),
  // which is served from the domain root, so no basePath/assetPrefix is needed.
  // If you ever move this to a project repo (username.github.io/repo-name),
  // set BASE_PATH in the environment (see .github/workflows/deploy.yml) and
  // uncomment the two lines below.
  // basePath: process.env.BASE_PATH || '',
  // assetPrefix: process.env.BASE_PATH || '',
};

module.exports = nextConfig;
