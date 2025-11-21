import { contextBridge } from "electron";
import { patientService } from "./patientService";
import IElectronService from "src/shared/interfaces/IElectronService";
import { professionnelService } from "./professionnelService";
import { adresseService } from "./adresseService";


contextBridge.exposeInMainWorld("electronService", {
    patients: patientService(),
    professionnels: professionnelService(),
    adresses: adresseService()
} as IElectronService)