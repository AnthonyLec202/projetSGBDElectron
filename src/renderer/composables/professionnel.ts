import { ref } from "vue";

import { Professionnel } from "src/shared/professionnel";


const professionnels = ref<Professionnel[]>([]);

export function useProfessionnels() {

    const fetchProfessionnels = async() => {
        professionnels.value = await window.electronService.professionnels.getProfessionnels();
    };


    return {
        professionnels,
        fetchProfessionnels
    }
}