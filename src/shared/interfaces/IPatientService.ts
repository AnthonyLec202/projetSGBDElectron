import {Patient, PatientCreateDto, PatientUpdateDto} from "../patient";

export default interface IPatientService {
    getPatients:() => Promise<Patient[]>,
    getPatientById:(id: number) => Promise<Patient>,
    addPatient:(patientDto: PatientCreateDto) => Promise<Patient>,
    deletePatient:(id: number) => Promise<void>,
    updatePatient:(id: number, patientDto: PatientUpdateDto) => Promise<Patient>
}