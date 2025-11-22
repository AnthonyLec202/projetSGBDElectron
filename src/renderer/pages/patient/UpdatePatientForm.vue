<template>
  <div class="container" v-if="patientUpdate">
    
    <h2>Mettre à jour : {{ patientUpdate.nom }} {{ patientUpdate.prenom }}</h2>
    
    <form @submit.prevent="handleUpdate">
      <label for="nom">Nom :</label>
      <input v-model="nom" type="text" id="nom" required>

      <label for="prenom">Prénom :</label>
      <input v-model="prenom" type="text" id="prenom" required>

      <label for="date_naissance">Date de naissance :</label>
      <input v-model="dateNaissance" type="date" id="dateNaissance">

      <label for="sexe">Sexe :</label>
      <select v-model="sexe" id="sexe">
        <option value="M">M</option>
        <option value="F">F</option>
      </select>

      <label for="tel">Téléphone :</label>
      <input v-model="tel" type="text" id="tel" placeholder="Téléphone (optionnel)">

      <label for="email">Email :</label>
      <input v-model="email" type="text" id="email" placeholder="Email (optionnel)">
      
      <button type="submit">Mettre à jour le patient</button>
    </form>
  </div>
  
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePatients } from 'src/renderer/composables/patients';

import { Patient, PatientUpdateDto, SexeType } from 'src/shared/patient';

const route = useRoute(); 
const router = useRouter();
const { getPatientById, updatePatient } = usePatients();

const patientUpdate = ref<Patient | null>(null);

const nom = ref('');
const prenom = ref('');
const dateNaissance = ref(''); 
const sexe = ref<SexeType | null>(null); 
const tel = ref('');
const email = ref('');

onMounted(async () => {

    const id = Number(route.params.id); 
    if (isNaN(id)) {
        console.error("ID invalide.");
        router.push('/'); 
        return;
    }

    const patientData = await getPatientById(id);
    
    if (patientData) {
        patientUpdate.value = patientData;
            
        nom.value = patientData.nom;
        prenom.value = patientData.prenom;
        sexe.value = patientData.sexe;
        tel.value = patientData.tel || '';
        email.value = patientData.email || '';
        
        if (patientData.dateNaissance) 
          dateNaissance.value = new Date(patientData.dateNaissance).toISOString().split('T')[0];
        
    } else {
        console.error("Patient non trouvé.");
        router.push('/');
    }
});

const handleUpdate = async () => {
    if (!patientUpdate.value || !patientUpdate.value.id) return;
    
    const dataToUpdate: PatientUpdateDto = {
        nom: nom.value,
        prenom: prenom.value, 
        dateNaissance: dateNaissance.value ? new Date(dateNaissance.value) : null,
        sexe: sexe.value, 
        tel: tel.value || null,
        email: email.value || null
    };

    try {
        await updatePatient(patientUpdate.value.id, dataToUpdate);
        router.push('/'); 
    } catch (error) {
        console.error("Échec de la mise à jour :", error);
        alert("Erreur lors de la mise à jour.");
    }
};
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 500px;
    margin: 40px auto; 
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 10px; 
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 24px;
}


form {
    width: 100%;
    display: flex;
    flex-direction: column;
}


label {
    margin-bottom: 6px;
    font-weight: 600;
    text-align: left;
}


input[type="text"],
input[type="date"],
select {
    width: 100%;
    padding: 12px; 
    margin-bottom: 16px; 
    border: 1px solid #ddd;
    border-radius: 6px; 
    box-sizing: border-box; 
    font-size: 16px;
}


button[type="submit"] {
    width: 100%;
    padding: 12px;
    background-color: #007bff; 
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
    background-color: #0056b3; 
}

</style>