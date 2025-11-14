import Patient from "../patient";

export default interface IPatientService {
    getPatients:() => Promise<Patient[]>,
    addPatient:(patient: Patient) => Promise<void>,
    deletePatient:(id: number) => Promise<void> 
}