import { ipcRenderer } from "electron"
import IPatientService from "src/shared/interfaces/IPatientService"
import Patient from "src/shared/patient"

export function patientService(): IPatientService {
    return { 
        getPatients: () => ipcRenderer.invoke("patientRepository:getPatients"),
        addPatient: (patient: Patient) => ipcRenderer.invoke("patientRepository:addPatient", patient),
        deletePatient:(id: number) => ipcRenderer.invoke("patientRepository:deletePatient", id)         
    }
}