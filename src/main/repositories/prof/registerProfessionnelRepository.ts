import { ProfessionnelRepository } from "./professionnelRepository";
import { ipcMain } from "electron";



export function registerProfessionnelRepository(){
    const profRepository = new ProfessionnelRepository();

    ipcMain.handle("profRepository:getProfessionnels", (e, a) => {
        return profRepository.getProfessionnels();
    });

}