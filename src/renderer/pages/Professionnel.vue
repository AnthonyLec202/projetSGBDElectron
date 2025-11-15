<template>
  <div class="page-container">
    <h1>Nos Professionnels</h1>
    
    <button @click="fetchProfessionnels">Rafraîchir</button>

    <div class="list-container" v-if="professionnels.length > 0">
      <ProfessionnelCard
        v-for="pro in professionnels"
        :key="pro.id"
        :professionnel="pro" 
      />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProfessionnelCard from '../components/professionnel/ProfessionnelCard.vue';
import { useProfessionnels } from '../composables/professionnel';


const { professionnels, fetchProfessionnels } = useProfessionnels();


onMounted(() => {
  fetchProfessionnels();
});
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.list-container {
  margin-top: 20px;
}
</style>