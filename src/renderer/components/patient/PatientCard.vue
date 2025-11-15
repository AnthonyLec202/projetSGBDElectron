<template>
    <div class="card">
        <div class="card-info">
            <span class="nom">{{ props.patient.nom }}</span>
            <span class="prenom">{{ props.patient.prenom}}</span>
        </div>
        <button class="delete-button" @click="handleDelete">Supprimer</button>
        <button class="updateButton" @click="handleUpdate">Modifier</button>
    </div>
</template>


<script lang="ts" setup>
import { Patient } from 'src/shared/patient';
import { usePatients } from 'src/renderer/composables/patients';
import { useRouter } from 'vue-router';

interface Props {
    patient: Patient
}

const props = defineProps<Props>();

const {deletePatient} = usePatients();
const router = useRouter();

const handleDelete = async () => {
    let confirmation = confirm(`Voulez-vous supprimer ${props.patient.nom} ${props.patient.prenom} ?`);
    if(confirmation)
        await deletePatient(props.patient.id);
}

const handleUpdate = () => {
    router.push("/update-patient/" + props.patient.id);
}


</script>

<style>
.card {
    display: flex;
    padding: 2rem;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, .2);
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: 1px solid #e2e8f0;
    border-radius: .5rem;
    transition: ease-in-out .2s;
}

.card-info {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    color: #334155;
    flex-grow: 1;
}

.card-info .nom {
    font-size: 1.1rem;
    font-weight: 600;
}

.card-info .prenom {
    font-weight: 400;
}

.card:hover {
    transform: translateY(-5px);
}

.delete-button {
    background: #ef4444;
    border: none;
    color: white;
    padding: .5rem 1rem;
    border-radius: .375rem;
    font-weight: 600;
    cursor: pointer;
}

</style>