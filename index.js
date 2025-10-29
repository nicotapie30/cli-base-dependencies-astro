#!/usr/bin/env node
import { writeFile } from "fs/promises";
import { spawn } from "child_process";
import { cwd } from "process";
import path from "path";

const prettierObject = {
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

const stringEslint = `export default [
  ...eslintPluginAstro.configs.recommended,

  {
    rules: {
      // override/add rules settings here.
    },
  },
];`;

const parseoObjectPrettier = JSON.stringify(prettierObject, null, 2);
const rutePathPrettier = path.join(cwd(), ".prettierrc");
const rutePathEslint = path.join(cwd(), "eslint.config.js");

const packageManager = "npm";
const command = [
  "install",
  "prettier",
  "prettier-plugin-astro",
  "prettier-plugin-tailwindcss",
  "--save-dev",
];

const execCommands = () => {
  return new Promise((resolve, reject) => {
    const installDependencies = spawn(packageManager, command, { shell: true });

    installDependencies.on("error", (error) => {
      reject(`Error fatal al ejecutar el proceso: ${error.message}`);
    });

    installDependencies.stdout.on("data", (data) => {
      console.log(`Archivo creado correctamente ${data.toString()}.`);
    });

    installDependencies.stderr.on("data", (data) => {
      console.error(`Error ${data.toString()}`);
    });

    installDependencies.on("close", (code) => {
      if (code === 0) {
        console.log("Instalación de dependencias completada con éxito!");
        resolve();
      } else {
        reject(new Error(`El proceso terminó con código ${code}`));
      }
    });
  });
};

const createPrettierFile = async () => {
  try {
    await writeFile(rutePathPrettier, parseoObjectPrettier, {
      encoding: "utf-8",
    });
    await execCommands();
  } catch (error) {
    console.error(error);
  }
};

const createEslintFile = async () => {
  try {
    const file = await writeFile(rutePathEslint, stringEslint, {
      encoding: "utf-8",
    });
    console.log(file);
  } catch (error) {
    console.error(error);
  }
};
