import IProfessionnelService from "src/shared/interfaces/IProfessionnelService"
import { ipcRenderer } from "electron"
import { ProfessionnelCreateDto } from "src/shared/professionnel"

export function professionnelService(): IProfessionnelService{
    return{
        getProfessionnels: () => ipcRenderer.invoke("profRepository:getProfessionnels"),
        addProfessionnel: (professionnelDto: ProfessionnelCreateDto) => ipcRenderer.invoke("profRepository:addProfessionnel", professionnelDto)
    }
}