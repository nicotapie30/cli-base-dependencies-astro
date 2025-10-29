import { error } from 'console';
import { access, constants } from 'fs/promises';
import path from 'path';
import { cwd } from 'process'

export const packageManager = "";

const detectedManager = async () => {
    try {      
        if (await access(path.join(cwd(), "./package-lock.json"), constants.F_OK)) {
            packageManager = "npm";
        }
        if (await access(path.join(cwd(), "./pnpm-lock.yaml"), constants.F_OK)) {
            packageManager = "pnpm";
        }
    
        if (await access(path.join(cwd(), "./yarn.lock"), constants.F_OK)) {
            packageManager = "yarn";
        }
    
        if (await access(path.join(cwd(), "./bun.lockb"), constants.F_OK)) {
            packageManager = "bun";
        }
    } catch (error) {
        console.log(`Error al detectar el gestor de paquetes. ${error}`)        
    }
}

detectedManager()