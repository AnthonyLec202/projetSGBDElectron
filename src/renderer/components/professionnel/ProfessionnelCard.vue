<template>
  <div class="pro-card">
    <div class="pro-info">
      <h3>{{ props.professionnel.nom }} {{ props.professionnel.prenom }}</h3>
      <p class-><i>{{ props.professionnel.specialite }}</i></p>
      <p class="contact">
        <span>{{ props.professionnel.email }}</span> | 
        <span>{{ props.professionnel.tel }}</span>
      </p>
    </div>

    <div class="adresses-list" v-if="props.professionnel.adresses && props.professionnel.adresses.length > 0">
      <h4>Adresses :</h4>
      <ul>
        <li v-for="adresse in props.professionnel.adresses" :key="adresse.id">
          {{ adresse.rue }} {{ adresse.numero }}, {{ adresse.codePostal }} {{ adresse.ville }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p><i>Aucune adresse enregistrée.</i></p>
    </div>

  </div>
</template>

<script setup lang="ts">


import { Professionnel } from 'src/shared/professionnel';


interface Props {
  professionnel: Professionnel
}
const props = defineProps<Props>();

</script>

<style scoped>
.pro-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.pro-info p {
  margin: 4px 0;
}
.contact {
  font-size: 1.1em;
  color: #555;
}
.adresses-list {
  margin-top: 10px;
  border-top: 1px dashed #eee;
  padding-top: 10px;
}
.adresses-list ul {
  padding-left: 20px;
  margin: 0;
}
</style>