<template>
    <span>{{ props.seance.date_heure }}</span>
    <span>{{ props.seance.notes }}</span>
    
</template>

<script lang="ts" setup>
import Seance from 'src/shared/seance';


interface Props {
    seance: Seance
}

const props = defineProps<Props>();





</script>

