import { contextBridge } from "electron";
import { patientService } from "./patientService";
import IElectronService from "src/shared/interfaces/IElectronService";


contextBridge.exposeInMainWorld("electronService", {
    patients: patientService()
} as IElectronService)