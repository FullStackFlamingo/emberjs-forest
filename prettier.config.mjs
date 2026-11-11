export default { 
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 120,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  plugins: ['prettier-plugin-ember-template-tag'], 
  overrides: [
    {
      files: '*.{js,gjs,ts,gts,mjs,mts,cjs,cts}',
      options: {
        templateSingleQuote: false,
      },
    },
  ],
};
