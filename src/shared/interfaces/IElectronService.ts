import IAdresseService from "./IAdresseService";
import IPatientService from "./IPatientService"
import IProfService from "./IProfessionnelService";


export default interface IElectronService {
    patients: IPatientService;
    professionnels: IProfService; 
    adresses: IAdresseService;  
}

declare global {
    interface Window {
        electronService: IElectronService
    }
}