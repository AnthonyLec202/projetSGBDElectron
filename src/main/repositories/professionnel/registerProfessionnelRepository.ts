import { ProfessionnelCreateDto } from "src/shared/professionnel";
import { ProfessionnelRepository } from "./professionnelRepository";
import { ipcMain } from "electron";



export function registerProfessionnelRepository(){
    const profRepository = new ProfessionnelRepository();

    ipcMain.handle("profRepository:getProfessionnels", (e, a) => {
        return profRepository.getProfessionnels();
    });

    ipcMain.handle("profRepository:addProfessionnel", (e, professionnelDto: ProfessionnelCreateDto) => {
        return profRepository.addProfessionnel(professionnelDto)
    })

    ipcMain.handle("profRepository:deleteProfessionnel", (e, id: number) => {
        return profRepository.deleteProfessionnel(id);
    })



}