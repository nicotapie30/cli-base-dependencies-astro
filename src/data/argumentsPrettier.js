export const prettierObject = {
  plugins: ["prettier-plugin-astro"],

  overrides: [
    {
      files: "*.astro",

      options: {
        parser: "astro",
      },
    },
  ],

  singleQuote: true,

  trailingComma: "es5",

  tabWidth: 2,

  printWidth: 80,

  semi: true,
};