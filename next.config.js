const ghPages = process.env.DEPLOY_TARGET === 'gh-pages';

module.exports = {
  assetPrefix: ghPages ? '/saifbechan.github.io/' : '',
  options: {
    sourcemaps: 'production',
  },
};
