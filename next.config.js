// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

module.exports = withPWA({
  swcMinify: true,
  pwa: {
    dest: 'public',
  },
});
