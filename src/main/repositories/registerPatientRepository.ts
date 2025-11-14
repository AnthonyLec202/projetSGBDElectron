import { ipcMain } from "electron";
import { PatientRepository } from "./patientRepository";
import Patient from "src/shared/patient";


export function registerPatientRepository() {
  const patientRepository = new PatientRepository();

  ipcMain.handle("patientRepository:getPatients", (e, a) => {
    return patientRepository.getPatients();
  });

  ipcMain.handle("patientRepository:addPatient", (e, patient: Patient ) => {
    return patientRepository.addPatient(patient);
  })

  ipcMain.handle("patientRepository:deletePatient", (e, id: number) => {
    return patientRepository.deletePatient(id);
  })

  
}
