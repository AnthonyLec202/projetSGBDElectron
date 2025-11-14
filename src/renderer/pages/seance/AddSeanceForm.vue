<template>
  <div class="seance-form">
    <h2>Ajouter une Nouvelle Séance</h2>
    <form @submit.prevent="handleAddSeance">

      <label for="patient-select">Patient Associé :</label>
      <select v-model="selectedPatientId" required id="patient-select">
        <option :value="null" disabled>Sélectionnez un patient</option>
        <option 
          v-for="p in patients" 
          :key="p.id" 
          :value="p.id"
        >
          {{ p.nom }} {{ p.prenom }}
        </option>
      </select>

      <label for="type-seance">Type de Séance :</label>
      <input v-model="seanceType" type="text" id="type-seance" required>

      <label for="date-heure">Date et Heure :</label>
      <input v-model="seanceDate" type="datetime-local" id="date-heure" required>

      <label for="duree">Durée (minutes) :</label>
      <input v-model="seanceDuree" type="number" id="duree">
      
      <label for="notes">Notes :</label>
      <textarea v-model="seanceNotes" id="notes"></textarea>

      <button type="submit">Créer la Séance</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Assurez-vous d'avoir ces imports pour vos services
import { usePatients } from 'src/renderer/composables/patients';
import { useSeances } from 'src/renderer/composables/seances';

// Import de l'interface DTO (à définir dans votre dossier shared)
import Seance from 'src/shared/seance';


// --- 1. Gestion de l'État et Services ---
const router = useRouter();
const { addSeance } = useSeances();
const { patients, fetchPatients } = usePatients();

// État local des champs (initialisation)
const selectedPatientId = ref(null as number | null); // L'ID pour la connexion
const seanceType = ref('');
const seanceDate = ref(''); // V-model sur un input date/time donne une string
const seanceDuree = ref(null as number | null);
const seanceNotes = ref('');


// --- 2. Logique de Vie du Composant ---
onMounted(() => {
  // Charge la liste des patients au démarrage pour remplir le <select>
  fetchPatients(); 
});


// --- 3. Logique d'Action ---
const handleAddSeance = async () => {
  if (!selectedPatientId.value || !seanceType.value || !seanceDate.value) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }
  
  // A. Construction du DTO
  const seanceDTO: Seance = {
    // 1. La clé de relation pour Prisma.connect
    patientIdToConnect: selectedPatientId.value, 
    
    // 2. Les données de la séance
    type_seance: seanceType.value,
    
    // Conversion de la chaîne de l'input en objet Date
    date_heure: new Date(seanceDate.value), 
    
    // Mappage des chaînes vides ou null vers le type correct pour Prisma
    duree_seance: seanceDuree.value, 
    notes: seanceNotes.value || null, // Si c'est une chaîne vide, on force 'null'
  };

  try {
    // B. Appel du service de création
    await addSeance(seanceDTO);
    
    // C. Redirection après succès
    router.push('/'); 
  } catch (error) {
    console.error("Erreur lors de la création de la séance :", error);
    alert("La création a échoué. Consultez la console.");
  }
};
</script>