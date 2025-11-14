import { ipcMain } from "electron";
import { PatientRepository } from "./patientRepository";
import { Patient, PatientCreateDto, PatientUpdateDto } from "src/shared/patient";


export function registerPatientRepository() {
  const patientRepository = new PatientRepository();

  ipcMain.handle("patientRepository:getPatients", (e, a) => {
    return patientRepository.getPatients();
  });

  ipcMain.handle("patientRepository:getPatientById", (e, id: number) => {
    return patientRepository.getPatientById(id);
  })

  ipcMain.handle("patientRepository:addPatient", (e, patientDto: PatientCreateDto ) => {
    return patientRepository.addPatient(patientDto);
  })

  ipcMain.handle("patientRepository:deletePatient", (e, id: number) => {
    return patientRepository.deletePatient(id);
  })

  ipcMain.handle("patientRepository:updatePatient", (e, id: number, patientDto: PatientUpdateDto) => {
    return patientRepository.updatePatient(id, patientDto)
  })

  
}
