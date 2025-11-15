import { contextBridge } from "electron";
import { patientService } from "./patientService";
import IElectronService from "src/shared/interfaces/IElectronService";
import { profService } from "./profService";


contextBridge.exposeInMainWorld("electronService", {
    patients: patientService(),
    professionnels: profService()
} as IElectronService)