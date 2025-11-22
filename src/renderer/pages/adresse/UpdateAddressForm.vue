<template>
  <div class="container" v-if="addressUpdate">
    
    <h2>Mettre à jour : {{ addressUpdate.rue }}, {{ addressUpdate.numero }} 
        {{addressUpdate.codePostal}}  {{addressUpdate.ville}}
    </h2>
    
    <form @submit.prevent="handleUpdate"> 
      <label for="rue">Rue :</label>
      <input v-model.trim="rue" type="text" id="rue" required>

      <label for="numero">Numéro :</label>
      <input v-model.trim="numero" type="text" id="numero" required>

      <label for="codePostal">Code postal :</label>
      <input v-model.trim="codePostal" type="text" id="codePostal" required>


      <label for="ville">Ville :</label>
      <input v-model.trim="ville" type="text" id="ville" placeholder="Ville" required>
  
      <button type="submit">Mettre à jour l'adresse</button>
    </form>
  </div>
  
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdresses } from 'src/renderer/composables/adresses';

import { Adresse, AdresseUpdateDto } from 'src/shared/adresse';

const route = useRoute(); 
const router = useRouter();
const { getAddressById, updateAddress } = useAdresses();

const addressUpdate = ref<Adresse | null>(null);

const rue = ref('');
const numero = ref('');
const codePostal = ref(''); 
const ville = ref('');


onMounted(async () => {

    const id = Number(route.params.id); 
    if (isNaN(id)) {
        console.error("ID invalide.");
        router.push('/'); 
        return;
    }

    const addressData = await getAddressById(id);
    
    if (addressData) {
        addressUpdate.value = addressData;
            
        rue.value = addressData.rue;
        numero.value = addressData.numero;
        codePostal.value = addressData.codePostal;
        ville.value = addressData.ville;
         
    } 
    else {
        console.error("Adresse non trouvée.");
        router.push('/');
    }
});

const handleUpdate = async () => {
    if (!addressUpdate.value || !addressUpdate.value.id) return;
    
    const dataToUpdate: AdresseUpdateDto = {
        rue: rue.value,
        numero: numero.value, 
        codePostal: codePostal.value,
        ville: ville.value,    
    };

    try {
        await updateAddress(addressUpdate.value.id, dataToUpdate);
        router.push("/adresses"); 
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