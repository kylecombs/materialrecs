/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      'mongodb+srv://kylecombs:2003Renaissance@cluster0.rpxp7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  },
};

module.exports = nextConfig;
