<template>
  <div class="list-container">
    <h1>Mes Patients</h1>
    <PatientCard v-for="patient in patients" :patient="patient"
    @delete="handleDelete"
    @update="handleUpdate"/>
  </div>
  <AddPatientButton/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePatients } from '../composables/patients';
import { useRouter } from 'vue-router';
import PatientCard from '../components/patient/PatientCard.vue';
import AddPatientButton from '../components/patient/AddPatientButton.vue';



const {patients, fetchPatients, deletePatient} = usePatients();
const router = useRouter();

onMounted(async () => {
  fetchPatients();
});

const handleDelete = async (id: number) => {
    const patientToDelete = patients.value.find(p => p.id === id);
    const confirmation = confirm(`Voulez-vous vraiment supprimer ${patientToDelete.nom} ${patientToDelete.prenom} ?`);
    
    if (confirmation) {
        await deletePatient(id);
    }
};

const handleUpdate = (id: number) => {
    router.push(`/update-patient/${id}`);
};

</script>

<style scoped>

.list-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
  padding: 1rem;
  max-width: 75%;
}

</style>