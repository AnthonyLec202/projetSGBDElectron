import IPatientService from "./IPatientService"
import IProfService from "./IProfService";


export default interface IElectronService {
    patients: IPatientService;
    professionnels: IProfService;   
}

declare global {
    interface Window {
        electronService: IElectronService
    }
}