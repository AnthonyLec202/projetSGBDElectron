<template>
  <div class="page-container">
    <h1>Nos Professionnels</h1>
    
    <button class="btn-primary" @click="goToAddPage">Ajouter un professionnel</button>
    

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
import { useRouter } from 'vue-router';


const { professionnels, fetchProfessionnels } = useProfessionnels();
const router = useRouter();

onMounted(() => {
  fetchProfessionnels();
});

const goToAddPage = () => {
  router.push("/add-professionnel");
}
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.list-container {
  margin-top: 20px;
}

button {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

</style>