import IPatientService from "./IPatientService"
import ISeanceService from "./ISeanceService"

export default interface IElectronService {
    patients: IPatientService;
    seances: ISeanceService;
}

declare global {
    interface Window {
        electronService: IElectronService
    }
}