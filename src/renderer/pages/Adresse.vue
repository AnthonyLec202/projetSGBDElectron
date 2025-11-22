
<template>
    <div class="list-container">
        <h1>Adresses</h1>
        <AdresseCard v-for="adresse in adresses" :adresse="adresse"
        @delete="handleDelete"
        @update="handleUpdate"/>
    </div>
    <AddAddressButton/>

</template>

<script lang="ts" setup>

import { onMounted } from 'vue';
import { useAdresses } from '../composables/adresses';
import { useRouter } from 'vue-router';
import AdresseCard from '../components/adresse/AdresseCard.vue';
import AddAddressButton from '../components/adresse/AddAddressButton.vue';


const {adresses, getAddresses, deleteAddress} = useAdresses();
const router = useRouter();

onMounted(async () => {
    getAddresses();
});

const handleDelete = async(id: number) => {
    const confirmation = confirm("Voulez-vous vraiment supprimer cette adresse ?");

    if(confirmation)
        await deleteAddress(id);
};

const handleUpdate = async(id: number) => {
    router.push(`/update-address/${id}`);
}
</script>

<style scoped>

.list-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 0.6rem;
  padding: 1rem;
  max-width: 75%;
  padding-bottom: 100px;
}

</style>
