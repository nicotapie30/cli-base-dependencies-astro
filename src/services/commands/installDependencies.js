import { spawn } from 'child_process';
import chalk from 'chalk';

export const execCommands = async (packageManager, command) => {
  if (!packageManager) {
    throw new Error(
      chalk.red(
        'No se pudo detectar el gestor de paquetes. Abortando ejecución.'
      )
    );
  }

  return new Promise((resolve, reject) => {
    const installDependencies = spawn(packageManager, command, { shell: true });

    installDependencies.on('error', (error) => {
      reject(
        chalk.bgRed.white.bold(
          `Error fatal al ejecutar el proceso: ${error.message}`
        )
      );
    });

    installDependencies.stdout.on('data', (data) => {
      console.log(chalk.white(data.toString()));
    });

    installDependencies.stderr.on('data', (data) => {
      console.error(chalk.red(`Error: ${data.toString()}`));
    });

    installDependencies.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(chalk.red.bold(`El proceso terminó con código ${code}`))
        );
      }
    });
  });
};
