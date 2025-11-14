<template>
    <div class="container">
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
import Patient from 'src/shared/patient';
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
    let patient = {
        nom: nom.value,
        prenom: prenom.value,
        date_naissance: date_naissance.value ? new Date(date_naissance.value) : null,
        sexe: sexe.value || null,
        tel: tel.value || null,
        email: email.value || null
    } as Patient;

    await addPatient(patient);

    router.push('/');
}

</script>