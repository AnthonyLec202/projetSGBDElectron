import { ipcMain } from "electron";
import { AdresseRepository } from "./adresseRepository";
import { Adresse } from "src/shared/adresse";


export function registerAdresseRepository(){
    const adresseRepository = new AdresseRepository();

    ipcMain.handle("adresseRepository:searchAdresses", (e, query: string) => {
        return adresseRepository.searchAdresses(query);
    })

}