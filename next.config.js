// eslint-disable-next-line @typescript-eslint/no-var-requires
const withOffline = require('next-offline');

const nextConfig = {
  target: 'serverless',
};

module.exports = withOffline(nextConfig);
