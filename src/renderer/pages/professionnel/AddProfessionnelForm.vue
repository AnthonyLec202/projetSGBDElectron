<template>
  <div class="form-card">
    <h2>Nouveau Professionnel</h2>
    
    <form @submit.prevent="handleSubmit">
      
      <div class="section">
        <h3>Informations</h3>
        <div class="row">
          <div class="input-group">
            <input v-model="nom" placeholder="Nom (requis)" required>
          </div>
          <div class="input-group">
            <input v-model="specialite" placeholder="Specialité (requis)" required>
          </div>
        </div>
        <div class="row">
          <div class="input-group"> 
            <input v-model="prenom" placeholder="Prénom">
          </div>
          <div class="input-group">
            
            <input v-model="email" type="email" placeholder="Email">
          </div>
          <div class="input-group">
            
            <input v-model="tel" placeholder="Téléphone">
          </div>
        </div>
      </div>

      <div class="section addresses-section">
        <h3>Lieux d'exercice</h3>
        
        <p class="hint">Sélectionnez les cabinets où ce professionnel exerce :</p>

        <div class="add-box">
          <select v-model="selectedAddressId" class="address-select">
            <option :value="null" disabled>-- Choisir un cabinet existant --</option>
            <option v-for="addr in allAdresses" :key="addr.id" :value="addr.id">
              {{ addr.ville }} - {{ addr.rue }} ({{ addr.codePostal }})
            </option>
          </select>
          
          <button type="button" class="btn-add" @click="addAddressToCart" :disabled="!selectedAddressId">
            Ajouter
          </button>
        </div>

        <div class="cart" v-if="addressesCart.length > 0">
          <p>Adresses sélectionnées :</p>
          <ul>
            <li v-for="addr in addressesCart" :key="addr.id">
              <span class="text">{{ addr.numero }} {{ addr.rue }}, {{ addr.codePostal }} {{ addr.ville }}</span>
              <button type="button" class="remove-btn" @click="removeFromCart(addr.id)">Retirer</button>
            </li>
          </ul>
        </div>
        <div v-else class="empty-cart">
          Aucune adresse sélectionnée.
        </div>
      </div>

      <div class="actions">
        <button type="button" class="btn-cancel" @click="goBack">Annuler</button>
        <button type="submit" class="btn-submit">Enregistrer le Professionnel</button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfessionnels } from 'src/renderer/composables/professionnel';
import { useAdresses } from 'src/renderer/composables/adresses';
import { ProfessionnelCreateDto } from 'src/shared/professionnel';
import { Adresse } from 'src/shared/adresse';

const router = useRouter();
const { addProfessionnel } = useProfessionnels();
const { adresses: allAdresses, getAddresses} = useAdresses();


const nom = ref('');
const prenom = ref('');
const specialite = ref('');
const email = ref('');
const tel = ref('');

const selectedAddressId = ref<number | null>(null);
const addressesCart = ref<Adresse[]>([]);


onMounted(async () => {
    await getAddresses();
});


const addAddressToCart = () => {
    if (!selectedAddressId.value) return;

    
    const alreadyInCart = addressesCart.value.find(a => a.id === selectedAddressId.value);
    if (alreadyInCart) {
        alert("Cette adresse est déjà ajoutée.");
        return;
    }

    const fullAddress = allAdresses.value.find(a => a.id === selectedAddressId.value);
    
    if (fullAddress) {
        addressesCart.value.push(fullAddress);
        selectedAddressId.value = null;
    }
};

const removeFromCart = (id: number) => {
    addressesCart.value = addressesCart.value.filter(a => a.id !== id);
};



const handleSubmit = async () => {
    const dto: ProfessionnelCreateDto = {
        nom: nom.value,
        prenom: prenom.value || null,
        specialite: specialite.value,
        email: email.value || null,
        tel: tel.value || null,
        
        idsAdresses: addressesCart.value.map(a => a.id)
    };

    await addProfessionnel(dto);
    router.push('/professionnels');

};

const goBack = () => {
    router.back();
};
</script>

<style scoped>
.form-card {
    max-width: 700px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    border: 1px solid #eef2f6;
}

h2 { text-align: center; color: #334155; margin-bottom: 2rem; }
h3 { color: #475569; border-bottom: 2px solid #f1f5f9; padding-bottom: 0.5rem; margin-bottom: 1rem; }

.section { margin-bottom: 2rem; }
.row { display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;}
.input-group { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }

label { font-size: 0.9rem; font-weight: 600; color: #64748b; }
input, select {
    padding: 0.7rem; border: 1px solid #cbd5e1; border-radius: 6px;
    font-size: 1rem; transition: border-color 0.2s;
}
input:focus, select:focus { outline: none; border-color: #3b82f6; }


.hint { font-size: 0.9rem; color: #94a3b8; margin-bottom: 0.5rem; }
.add-box { display: flex; gap: 10px; }
.address-select { flex-grow: 1; }
.btn-add {
    background: #10b981; color: white; border: none; padding: 0 1.5rem;
    border-radius: 6px; cursor: pointer; font-weight: 600;
}
.btn-add:disabled { background: #cbd5e1; cursor: not-allowed; }


.cart { margin-top: 1rem; background: #f8fafc; padding: 1rem; border-radius: 6px; border: 1px dashed #cbd5e1; }
.cart ul { list-style: none; padding: 0; margin: 0; }
.cart li {
    display: flex; align-items: center; background: white;
    padding: 0.5rem 1rem; margin-bottom: 0.5rem; border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.cart li .icon { margin-right: 10px; }
.cart li .text { flex-grow: 1; }
.remove-btn {
    background: transparent; border: 1px solid #ef4444; color: #ef4444;
    padding: 0.2rem 0.6rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;
}
.remove-btn:hover { background: #ef4444; color: white; }
.empty-cart { color: #94a3b8; font-style: italic; margin-top: 0.5rem; }


.actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
.btn-cancel { background: white; border: 1px solid #cbd5e1; padding: 0.8rem 1.5rem; border-radius: 6px; cursor: pointer; }
.btn-submit { background: #3b82f6; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 6px; font-weight: bold; cursor: pointer; }
.btn-submit:hover { background: #2563eb; }
</style>