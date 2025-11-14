<template>
  <div class="container" v-if="patientPourUpdate">
    
    <h2>Mettre à jour : {{ patientPourUpdate.nom }} {{ patientPourUpdate.prenom }}</h2>
    
    <form @submit.prevent="handleUpdate">

      <label for="nom">Nom :</label>
      <input v-model="nom" type="text" id="nom" required>

      <label for="prenom">Prénom :</label>
      <input v-model="prenom" type="text" id="prenom" required>

      <label for="date_naissance">Date de naissance :</label>
      <input v-model="date_naissance" type="date" id="date_naissance">

      <label for="sexe">Sexe :</label>
      <select v-model="sexe" id="sexe">
        <option :value="null">Non spécifié</option>
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
  
  <div v-else>
    <p>Chargement des informations du patient...</p>
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




const patientPourUpdate = ref<Patient | null>(null);


const nom = ref('');
const prenom = ref('');
const date_naissance = ref(''); 
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
        patientPourUpdate.value = patientData;
             
        nom.value = patientData.nom;
        prenom.value = patientData.prenom;
        sexe.value = patientData.sexe;
        tel.value = patientData.tel || '';
        email.value = patientData.email || '';
        
        
        if (patientData.date_naissance) {
             date_naissance.value = new Date(patientData.date_naissance).toISOString().split('T')[0];
        }
    } else {
        console.error("Patient non trouvé.");
        router.push('/');
    }
});



const handleUpdate = async () => {
    if (!patientPourUpdate.value || !patientPourUpdate.value.id) return;
    
    
    const dataToUpdate: PatientUpdateDto = {
        nom: nom.value,
        prenom: prenom.value,       
        date_naissance: date_naissance.value ? new Date(date_naissance.value) : null,
        sexe: sexe.value, 
        tel: tel.value || null,
        email: email.value || null
    };

    try {
        await updatePatient(patientPourUpdate.value.id, dataToUpdate);
        router.push('/'); 
    } catch (error) {
        console.error("Échec de la mise à jour :", error);
        alert("Erreur lors de la mise à jour.");
    }
};
</script>