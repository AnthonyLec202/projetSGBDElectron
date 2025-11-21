import { ref } from "vue";

import { Professionnel, ProfessionnelCreateDto } from "src/shared/professionnel";


const professionnels = ref<Professionnel[]>([]);

export function useProfessionnels() {

    const fetchProfessionnels = async() => {
        professionnels.value = await window.electronService.professionnels.getProfessionnels();
    };

    const addProfessionnel = async(professionnelDto: ProfessionnelCreateDto) => {
        await window.electronService.professionnels.addProfessionnel(professionnelDto);
        await fetchProfessionnels();
    }


    return {
        professionnels,
        fetchProfessionnels,
        addProfessionnel
    }
}