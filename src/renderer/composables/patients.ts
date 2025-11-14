import Patient from "src/shared/patient";
import { ref } from "vue";

const patients = ref<Patient[]>([]);

export function usePatients() {
    const fetchPatients = async () => {
        patients.value = await window.electronService.patients.getPatients();
    };

    const addPatient = async (patient: Patient) => {
        await window.electronService.patients.addPatient(patient);
        fetchPatients();
    }

    const deletePatient = async (id: number) => {
        await window.electronService.patients.deletePatient(id);
        fetchPatients();
    }

    return  {
        patients,
        fetchPatients,
        addPatient,
        deletePatient
    }
}