// module.exports = {
//   reactStrictMode: false,
// };
module.exports = {
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
