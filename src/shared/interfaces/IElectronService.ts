import IPatientService from "./IPatientService"


export default interface IElectronService {
    patients: IPatientService;
    
}

declare global {
    interface Window {
        electronService: IElectronService
    }
}