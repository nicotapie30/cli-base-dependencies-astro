import { access } from 'fs/promises';
import path from 'path';
import { cwd } from 'process';
import chalk from 'chalk';

export const detectedManager = async () => {
  const root = cwd();

  const exist = async (file) => {
    try {
      await access(path.join(root, file));
      return true;
    } catch {
      return false;
    }
  };

  if (await exist('bun.lockb')) return 'bun';
  if (await exist('pnpm-lock.yaml')) return 'pnpm';
  if (await exist('yarn.lock')) return 'yarn';
  if (await exist('package-lock.json')) return 'npm';

  console.log(
    chalk.bgYellow.white(
      '⚠️ No se detectó ningún gestor de paquetes. Usando npm por defecto.'
    )
  );
  return 'npm';
};
