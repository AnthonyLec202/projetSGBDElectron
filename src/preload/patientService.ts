import { ipcRenderer } from "electron"
import IPatientService from "src/shared/interfaces/IPatientService"
import { PatientCreateDto } from "src/shared/patient"

export function patientService(): IPatientService {
    return { 
        getPatients: () => ipcRenderer.invoke("patientRepository:getPatients"),
        addPatient: (patientDto: PatientCreateDto) => ipcRenderer.invoke("patientRepository:addPatient", patientDto),
        deletePatient:(id: number) => ipcRenderer.invoke("patientRepository:deletePatient", id)         
    }
}