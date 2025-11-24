<template> 
    <form class="container" @submit.prevent="handleAdd">
        
        <h2>Ajouter une adresse</h2> 
        
        <input v-model="rue" type="text" name="rue" placeholder="Rue" required>
        <input v-model="numero" type="text" name="numero" placeholder="N°">
        <input v-model="codePostal" type="text" name="Code postal" placeholder="Code postal" required>
        <input v-model="ville" type="text" name="ville" placeholder="Ville" required>
            
        <button type="submit">Ajouter</button>
        
    </form>
</template>


<script lang="ts" setup>

import { ref } from 'vue';
import { useAdresses } from 'src/renderer/composables/adresses';
import { useRouter } from 'vue-router';

const {addAddress} = useAdresses();
const router = useRouter();

const rue = ref('');
const numero = ref('');
const codePostal = ref(''); 
const ville = ref('');


const handleAdd = async () => {
    let adresseDto = {
        rue: rue.value,
        numero: numero.value,
        codePostal: codePostal.value,
        ville: ville.value
    };

    await addAddress(adresseDto);

    router.push('/adresses');
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