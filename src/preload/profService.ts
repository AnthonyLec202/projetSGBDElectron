import IProfService from "src/shared/interfaces/IProfService";
import { ipcRenderer } from "electron"

export function profService(): IProfService{
    return{
        getProfessionnels: () => ipcRenderer.invoke("profRepository:getProfessionnels")
    }
}