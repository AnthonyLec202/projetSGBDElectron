import { ipcRenderer } from "electron";
import IAdresseService from "src/shared/interfaces/IAdresseService";

export function adresseService(): IAdresseService{
    return{
        searchAdresses:(query: string) => ipcRenderer.invoke("adresseRepository:searchAdresses", query)
    }
}