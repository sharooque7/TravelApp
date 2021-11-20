// module.exports = {
//   reactStrictMode: false,
// };
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "authorization",
            value: "token",
          },
        ],
      },
    ];
  },
};
