export default {
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{gjs,gts}',
      options: {
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
  ],
};
