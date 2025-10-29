#!/usr/bin/env node
import { writeFile } from "fs/promises";
import { cwd } from "process";
import path from "path";

import { execCommands } from "./services/commands/installDependencies.js";
import { packageManager }  from './services/packageManajer/detectedPackageManager.js';

import { prettierObject } from './data/argumentsPrettier.js';
import { stringEslint } from './data/argumentsEslint.js';

import { commandPrettier }  from './utils/prettier/argumentsPrettier.js';
import { commandEslint} from './utils/eslint/argumentsEslint.js';


const parseoObjectPrettier = JSON.stringify(prettierObject, null, 2);
const rutePathPrettier = path.join(cwd(), ".prettierrc");
const rutePathEslint = path.join(cwd(), "eslint.config.js");



const createPrettierFile = async () => {
  try {
    await writeFile(rutePathPrettier, parseoObjectPrettier, {
      encoding: "utf-8",
    });
    await execCommands(packageManager, commandPrettier);
  } catch (error) {
    console.error(error);
  }
};

const createEslintFile = async () => {
  try {
    await writeFile(rutePathEslint, stringEslint, {
      encoding: "utf-8",
    });
    await execCommands(packageManager, commandEslint)
  } catch (error) {
    console.error(error);
  }
};

