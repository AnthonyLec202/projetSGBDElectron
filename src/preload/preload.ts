import { contextBridge } from "electron";
import { patientService } from "./patientService";
import IElectronService from "src/shared/interfaces/IElectronService";
import { seanceService } from "./seanceService";

contextBridge.exposeInMainWorld("electronService", {
    patients: patientService(),
    seances: seanceService()
} as IElectronService)