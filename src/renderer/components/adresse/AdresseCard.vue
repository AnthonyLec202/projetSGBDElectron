<template>
    <div class="adress-card">
        <div class="adress-info">
            <span class="rue-numero">{{ props.adresse.rue }}, {{ props.adresse.numero }},</span>
            <span class="code-postal">{{ props.adresse.codePostal}}</span>
            <span class="ville">{{ props.adresse.ville}}</span>
        </div>
        <button class="delete-button" @click="onDeleteClick">Supprimer</button>
        <button class="update-button" @click="onUpdateClick">Modifier</button>  
    </div>
</template>

<script lang="ts" setup>
import { Adresse } from 'src/shared/adresse';

interface Props {
    adresse: Adresse
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "delete", id: number): void;
    (e: "update", id: number): void;
}>();

const onDeleteClick = () => {
    emit("delete", props.adresse.id);
}

const onUpdateClick = () => {
    emit("update", props.adresse.id);
}

</script>

<style>
.adress-card {
    display: flex;
    padding: 2rem;
    margin: 1rem;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, .2);
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border: 1px solid #e2e8f0;
    border-radius: .5rem;
    transition: ease-in-out .2s;
}

.adress-info {
   display: flex;
    flex-direction: row;
    align-items: baseline; 
    width: 100%;
    gap: 0.3rem; 
    font-size: 1.1rem;
    color: #334155;
}

.adress-card:hover {
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

.update-button {
    background: #3b82f6;
    border: none;
    color: white;
    padding: .5rem 1rem;
    border-radius: .375rem;
    font-weight: 600;
    cursor: pointer;
}


</style>