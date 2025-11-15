import { ref } from "vue";

import { Prof } from "src/shared/professionnel";


const professionnels = ref<Prof[]>([]);

export function useProfessionnels() {

    const fetchProfessionnels = async() => {
        professionnels.value = await window.electronService.professionnels.getProfessionnels();
    };


    return {
        professionnels,
        fetchProfessionnels
    }
}