import { Patient, PatientCreateDto, PatientUpdateDto } from "src/shared/patient";
import { ref } from "vue";

const patients = ref<Patient[]>([]);

export function usePatients() {
    const fetchPatients = async () => {
        patients.value = await window.electronService.patients.getPatients();
    };

    const getPatientById = async (id: number) => {
        const patient = await window.electronService.patients.getPatientById(id);
        return patient;
    }

    const addPatient = async (patientDto: PatientCreateDto) => {
        await window.electronService.patients.addPatient(patientDto);
        fetchPatients();
    }

    const deletePatient = async (id: number) => {
        await window.electronService.patients.deletePatient(id);
        fetchPatients();
    }

    const updatePatient = async(id: number, patientDto: PatientUpdateDto) => {
        await window.electronService.patients.updatePatient(id, patientDto);
        fetchPatients();
    }

    return  {
        patients,
        fetchPatients,
        getPatientById,
        addPatient,
        deletePatient,
        updatePatient
    }
}