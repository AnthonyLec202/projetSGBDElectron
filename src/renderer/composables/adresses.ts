import { ref } from "vue";
import { Adresse } from "src/shared/adresse";

export function useAdresses() {

    
    const adresses = ref<Adresse[]>([]);

    
    const searchAdresses = async (query: string) => {
        adresses.value = await window.electronService.adresses.searchAdresses(query);
    };

    return {
        adresses,
        searchAdresses
    };
}