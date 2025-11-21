<template>
  <div class="form-card">
    <h2>Nouveau Professionnel</h2>
    
    <form @submit.prevent="handleSubmit">
      
      <div class="section">
        <h3>Informations</h3>
        <div class="row">
          <input v-model="nom" placeholder="Nom (requis)" required>
          <input v-model="specialite" placeholder="Spécialité (requis)" required>
        </div>
        <div class="row">
          <input v-model="prenom" placeholder="Prénom (optionnel)">
          <input v-model="email" placeholder="Email (optionnel)">
          <input v-model="tel" placeholder="Téléphone (optionnel)">
        </div>
      </div>

      <div class="section addresses-section">
        <h3>Adresses de travail</h3>

        <div class="address-cart" v-if="hasAddresses">
          <p>Adresses associées :</p>
          <ul>
            <li v-for="a in selectedExistingAddresses" :key="'exist-' + a.id" class="tag existing">
              {{ a.ville }}, {{ a.rue }}
              <span class="remove" @click="removeExisting(a.id)">X</span>
            </li>
            <li v-for="(a, idx) in newAddressesToAdd" :key="'new-' + idx" class="tag new">
              {{ a.ville }}, {{ a.rue }}
              <span class="remove" @click="removeNew(idx)">X</span>
            </li>
          </ul>
        </div>

        <AdressSearch @select="onExistingSelected" />

        <div class="divider"><span>OU</span></div>

        <div class="manual-add">
          <h4>Créer une nouvelle adresse :</h4>
          <div class="row">
            <input v-model="newRue" placeholder="Rue" class="input-sm">
            <input v-model="newVille" placeholder="Ville" class="input-sm">
          </div>
          <div class="row">
            <input v-model="newCp" placeholder="Code Postal" class="input-sm">
            <input v-model="newNumero" placeholder="N°" class="input-sm">
          </div>
          <button type="button" @click="onManualAdd" class="btn-secondary">Ajouter cette adresse</button>
        </div>
      </div>

      <button type="submit" class="btn-primary">Enregistrer le Professionnel</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useProfessionnels } from 'src/renderer/composables/professionnel';
import AdressSearch from 'src/renderer/components/AdressSearch.vue';
import { Adresse, AdresseCreateDto } from 'src/shared/adresse';
import { ProfessionnelCreateDto } from 'src/shared/professionnel';

const router = useRouter();
const { addProfessionnel } = useProfessionnels();

// --- État du Pro ---
const nom = ref('');
const prenom = ref('');
const specialite = ref('');
const email = ref('');
const tel = ref('');

// --- État des Adresses ---
const selectedExistingAddresses = ref<Adresse[]>([]);
const newAddressesToAdd = ref<AdresseCreateDto[]>([]);

// --- État du mini-formulaire adresse ---
const newRue = ref('');
const newVille = ref('');
const newCp = ref('');
const newNumero = ref('');

const hasAddresses = computed(() => 
  selectedExistingAddresses.value.length > 0 || newAddressesToAdd.value.length > 0
);

// --- Logique ---

// 1. Sélection d'une adresse existante
const onExistingSelected = (addr: Adresse) => {
  // Éviter les doublons
  if (!selectedExistingAddresses.value.find(a => a.id === addr.id)) {
    selectedExistingAddresses.value.push(addr);
  }
};

// 2. Ajout manuel d'une nouvelle adresse
const onManualAdd = () => {
  if (!newRue.value || !newVille.value || !newCp.value) {
    alert("Rue, Ville et Code Postal sont requis.");
    return;
  }
  
  newAddressesToAdd.value.push({
    rue: newRue.value,
    ville: newVille.value,
    codePostal: newCp.value,
    numero: newNumero.value || null
  });

  // Reset des champs
  newRue.value = ''; newVille.value = ''; newCp.value = ''; newNumero.value = '';
};

// Suppressions du panier
const removeExisting = (id: number) => {
  selectedExistingAddresses.value = selectedExistingAddresses.value.filter(a => a.id !== id);
};
const removeNew = (index: number) => {
  newAddressesToAdd.value = newAddressesToAdd.value.filter((_, i) => i !== index);
};

// 3. Soumission Finale
const handleSubmit = async () => {
  const dto: ProfessionnelCreateDto = {
    nom: nom.value,
    prenom: prenom.value || null,
    specialite: specialite.value,
    email: email.value || null,
    tel: tel.value || null,
    
    // On envoie les IDs des existantes
    idAdressesExistantes: selectedExistingAddresses.value.map(a => a.id),
    
    // On envoie les objets complets des nouvelles
    adresseACreer: newAddressesToAdd.value
  };

  try {
    await addProfessionnel(dto);
    router.push('/professionnels'); // Redirection vers la liste
  } catch (e) {
    alert("Erreur lors de la création du professionnel.");
  }
};
</script>

<style scoped>
.form-card { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.section { margin-bottom: 20px; }
.row { display: flex; gap: 10px; margin-bottom: 10px; }
input { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }

/* Style du Panier d'adresses */
.address-cart { background: #f9f9f9; padding: 10px; border-radius: 6px; margin-bottom: 15px; border: 1px dashed #ccc; }
.address-cart ul { list-style: none; padding: 0; }
.tag { display: flex; justify-content: space-between; background: white; padding: 5px 10px; margin-bottom: 5px; border-radius: 4px; border: 1px solid #eee; }
.tag.existing { border-left: 4px solid #007bff; }
.tag.new { border-left: 4px solid #28a745; }
.remove { cursor: pointer; color: red; font-weight: bold; }

.divider { text-align: center; margin: 15px 0; font-size: 0.8rem; color: #888; }
.manual-add { background: #f0f4f8; padding: 15px; border-radius: 8px; }

.btn-primary { width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }
.btn-secondary { width: 100%; padding: 8px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; }
</style>