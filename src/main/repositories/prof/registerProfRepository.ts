import { ProfRepository } from "./profRepository"
import { ipcMain } from "electron";
import { Prof } from "src/shared/professionnel";


export function registerProfRepository(){
    const profRepository = new ProfRepository();

    ipcMain.handle("profRepository:getProfessionnels", (e, a) => {
        return profRepository.getProfessionnels();
    });

}