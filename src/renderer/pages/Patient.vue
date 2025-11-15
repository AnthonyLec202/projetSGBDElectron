<template>
  <div class="list-container">
    <h1>Mes Patients</h1>
    <PatientCard v-for="patient in patients" :patient="patient"/>
  </div>
  <AddPatientButton/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import PatientCard from '../components/patient/PatientCard.vue';
import { usePatients } from '../composables/patients';
import AddPatientButton from '../components/patient/AddPatientButton.vue';



const {patients, fetchPatients} = usePatients();

onMounted(async () => {
  fetchPatients();
});
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