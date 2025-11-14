import Seance from "src/shared/seance";
import { ref } from "vue";

const seances = ref<Seance[]>([]);

export function useSeances() {

    const fetchSeances = async () => {
        seances.value = await window.electronService.seances.getSeances();
    };

    const addSeance = async (seance: Seance) => {
        await window.electronService.seances.addSeance(seance);
    }

    return {
        seances,
        fetchSeances,
        addSeance
    }
}