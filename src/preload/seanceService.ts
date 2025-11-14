import { ipcRenderer } from "electron";
import Seance from "src/shared/seance";
import ISeanceService from "src/shared/interfaces/ISeanceService";


export function seanceService() : ISeanceService {
    return{
        getSeances: () => ipcRenderer.invoke("seanceRepository:getSeances"),
        addSeance:(seance: Seance) => ipcRenderer.invoke("seanceRepository:addSeance", seance)
    }
    
}