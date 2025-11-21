<template>
    <div class="autocomplete-wrapper">
    <label class="label-search">Rechercher une adresse existante :</label>
    <div class="input-group">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="onInput" 
        placeholder="Tapez une ville, une rue..."
        class="search-input"
      >
      <span v-if="isLoading" class="loader">...</span>
    </div>

    <ul v-if="adresses.length > 0" class="suggestions-list">
      <li 
        v-for="addr in adresses" 
        :key="addr.id" 
        @click="selectAddress(addr)"
      >
        <strong>{{ addr.ville }}</strong> - {{ addr.numero }} {{ addr.rue }} ({{ addr.codePostal }})
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAdresses } from '../composables/adresses';
import { Adresse } from 'src/shared/adresse';

const emit = defineEmits(['select']);
const { searchAdresses, adresses} = useAdresses();

const searchQuery = ref('');
const isLoading = ref(false);
let timeout: NodeJS.Timeout;

const onInput = () => {
  clearTimeout(timeout);
  isLoading.value = true;
  
  timeout = setTimeout(async () => {
    if (searchQuery.value.length >= 3) {
      await searchAdresses(searchQuery.value);
    } else {
      adresses.value = [];
    }
    isLoading.value = false;
  }, 300); // Debounce
};

const selectAddress = (addr: Adresse) => {
  emit('select', addr); // On envoie l'objet au parent
  adresses.value = []; // On vide la liste
  searchQuery.value = '';   // On vide le champ
};
</script>

<style scoped>
.autocomplete-wrapper { position: relative; margin-bottom: 15px; }
.label-search { display: block; margin-bottom: 5px; font-weight: bold; font-size: 0.9rem; color: #555; }
.search-input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
.suggestions-list {
  position: absolute; z-index: 1000; width: 100%;
  background: white; border: 1px solid #ddd; border-radius: 0 0 6px 6px;
  list-style: none; padding: 0; margin: 0; max-height: 200px; overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.suggestions-list li { padding: 10px; cursor: pointer; border-bottom: 1px solid #eee; }
.suggestions-list li:hover { background-color: #f0f8ff; }
</style>