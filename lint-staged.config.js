module.exports = {
  '**/*.ts?(x)': [
    () => 'tsc --project tsconfig.json --pretty --noEmit',
    () => 'tsc --project cypress/tsconfig.json --pretty --noEmit',
  ],
  '**/*.(ts|js)?(x)': (filenames) => `yarn eslint ${filenames.join(' ')} --fix`,
  '**/*.(scss)?(x)': (filenames) => `yarn stylelint ${filenames.join(' ')} --syntax scss --fix`,
};
