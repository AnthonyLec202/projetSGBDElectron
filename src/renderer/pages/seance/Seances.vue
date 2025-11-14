<template>
  <div class="seances-container">
    <div class="header">
      <h1>Mes Séances</h1>
    </div>
    
    <div>
      <seance-card v-for="value in seances" :seance="value"/>
    </div>
    
    
  </div>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import SeanceCard from 'src/renderer/components/seance/SeanceCard.vue';
import { useSeances } from '../../composables/seances';


const {seances, fetchSeances} = useSeances();

onMounted(async () => {
  fetchSeances();
});

</script>

<style>
</style>

