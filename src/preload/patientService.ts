import { ipcRenderer } from "electron"
import IPatientService from "src/shared/interfaces/IPatientService"
import { PatientCreateDto, PatientUpdateDto } from "src/shared/patient"

export function patientService(): IPatientService {
    return { 
        getPatients: () => ipcRenderer.invoke("patientRepository:getPatients"),
        getPatientById: (id: number) => ipcRenderer.invoke("patientRepository:getPatientById", id),
        addPatient: (patientDto: PatientCreateDto) => ipcRenderer.invoke("patientRepository:addPatient", patientDto),
        deletePatient:(id: number) => ipcRenderer.invoke("patientRepository:deletePatient", id),
        updatePatient:(id: number, patientDto: PatientUpdateDto) => ipcRenderer.invoke("patientRepository:updatePatient", id, patientDto)         
    }
}