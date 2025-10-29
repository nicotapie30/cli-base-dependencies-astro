import { spawn } from "child_process";

export const execCommands = async (packageManager, command) => {
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