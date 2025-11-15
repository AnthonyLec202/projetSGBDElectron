import IProfessionnelService from "src/shared/interfaces/IProfessionnelService"
import { ipcRenderer } from "electron"

export function professionnelService(): IProfessionnelService{
    return{
        getProfessionnels: () => ipcRenderer.invoke("profRepository:getProfessionnels")
    }
}