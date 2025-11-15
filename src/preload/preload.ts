import { contextBridge } from "electron";
import { patientService } from "./patientService";
import IElectronService from "src/shared/interfaces/IElectronService";
import { professionnelService } from "./professionnelService";


contextBridge.exposeInMainWorld("electronService", {
    patients: patientService(),
    professionnels: professionnelService()
} as IElectronService)