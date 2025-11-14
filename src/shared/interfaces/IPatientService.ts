import {Patient, PatientCreateDto} from "../patient";

export default interface IPatientService {
    getPatients:() => Promise<Patient[]>,
    addPatient:(patientDto: PatientCreateDto) => Promise<Patient>,
    deletePatient:(id: number) => Promise<void> 
}