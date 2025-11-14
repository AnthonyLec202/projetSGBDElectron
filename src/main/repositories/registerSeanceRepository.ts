
import { ipcMain } from "electron";
import Seance from "src/shared/seance";
import { SeanceRepository } from "./seanceRepository";


export function registerSeanceRepository(){
    const seanceRepository = new SeanceRepository();
    
      ipcMain.handle("seanceRepository:getSeances", (e, a) => {
        return seanceRepository.getSeances();
      });

      ipcMain.handle("seanceRepository:addSeance", (e, seance: Seance) => {
        return seanceRepository.addSeance(seance);
      })
}