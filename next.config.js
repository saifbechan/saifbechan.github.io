// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    mode: 'production',
    dest: 'public',
  },
  options: {
    sourcemaps: 'production',
  },
});
