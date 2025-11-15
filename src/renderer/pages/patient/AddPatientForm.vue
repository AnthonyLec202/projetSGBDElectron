<template>
    <div class="container">
        <h2>Ajouter un patient</h2> 
        <input v-model="nom" type="text" name="nom" placeholder="Nom">
        <input v-model="prenom" type="text" name="prenom" placeholder="Prenom">
        <input v-model="date_naissance" type="date" name="date_naissance">
        <select v-model="sexe" name="sexe">
            <option value="">Sélectionner le sexe (optionnel)</option>
            <option value="M">M</option>
            <option value="F">F</option>
        </select>
        <input v-model="tel" type="text" name="tel" placeholder="Téléphone (optionnel)">
        <input v-model="email" type="text" name="email" placeholder="Email (optionnel)">
        <button type="submit" @click="handleAdd">Ajouter</button>
    </div>

</template>


<script lang="ts" setup>
import {PatientCreateDto, SexeType } from 'src/shared/patient';
import { ref } from 'vue';
import { usePatients } from 'src/renderer/composables/patients';
import { useRouter } from 'vue-router';

const {addPatient} = usePatients();
const router = useRouter();

const nom = ref('');
const prenom = ref('');
const date_naissance = ref<string>(''); 
const sexe = ref('');
const tel = ref('');
const email = ref('');

const handleAdd = async () => {
    let patientDto = {
        nom: nom.value,
        prenom: prenom.value,
        date_naissance: date_naissance.value ? new Date(date_naissance.value) : null,
        sexe: (sexe.value as SexeType) || null,
        tel: tel.value || null,
        email: email.value || null
    } as PatientCreateDto;

    await addPatient(patientDto);

    router.push('/');
}

</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column; 
    gap: 1rem; 
    
    max-width: 500px; 
    margin: 2rem auto; 
    padding: 2rem; 

    background-color: #ffffff;
    border-radius: 8px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); 
    
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}


h2 {
    text-align: center;
    color: #333;
    margin-top: 0;
}


input,
select {
    width: 100%; 
    padding: 0.85rem; 
    font-size: 1rem;
    border: 1px solid #ddd; 
    border-radius: 5px; 
    box-sizing: border-box; 
}


input:focus,
select:focus {
    outline: none; 
    border-color: #007aff; 
    box-shadow: 0 0 0 3px rgba(0,122,255,0.1); 
}


button {
    padding: 0.9rem;
    font-size: 1rem;
    font-weight: 600;
    color: white; 
    background-color: #007aff; 
    border: none;
    border-radius: 5px;
    cursor: pointer; 
    transition: background-color 0.2s ease; 
}


button:hover {
    background-color: #005ecb;
}
</style>