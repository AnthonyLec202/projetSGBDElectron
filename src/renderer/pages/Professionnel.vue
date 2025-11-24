<template>
  <div class="page-container">
    <h1>Contacts</h1>
    
    <div class="list-container" v-if="professionnels.length > 0">
      <ProfessionnelCard v-for="pro in professionnels" :key="pro.id" :professionnel="pro"
      @delete="handleDelete"/>
    </div>
    <addProfessionnelButton/>

    
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import ProfessionnelCard from '../components/professionnel/ProfessionnelCard.vue';
import addProfessionnelButton from '../components/professionnel/addProfessionnelButton.vue';
import { useProfessionnels } from '../composables/professionnel';
import { useRouter } from 'vue-router';

const { professionnels, fetchProfessionnels, deleteProfessionnel } = useProfessionnels();
const router = useRouter();

onMounted(() => {
  fetchProfessionnels();
});


const handleDelete = async(id:number) => {
  const proToDelete = professionnels.value.find(p => p.id === id);
  const confirmation = confirm(`Voulez-vous vraiment supprimer ${proToDelete.nom} ?`);
  if(confirmation)
    await deleteProfessionnel(id);
}
</script>
<style scoped>

h1 {
    color: white;
}

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
