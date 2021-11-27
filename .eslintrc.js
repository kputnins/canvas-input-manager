module.exports = {
  extends: 'eslint-config-claims-intake',
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    jest: {
      version: 26,
    },
  },
};