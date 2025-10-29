export const stringEslint = `
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...eslintPluginAstro.configs.recommended,

  {
    rules: {
      // override/add rules settings here.
    },
  },
];`;