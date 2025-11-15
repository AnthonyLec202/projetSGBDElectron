import IPatientService from "./IPatientService"
import IProfService from "./IProfessionnelService";


export default interface IElectronService {
    patients: IPatientService;
    professionnels: IProfService;   
}

declare global {
    interface Window {
        electronService: IElectronService
    }
}