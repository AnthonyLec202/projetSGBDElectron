import { Professionnel } from "./professionnel";


export interface Adresse {
    id: number;
    rue: string;
    numero: string;
    codePostal: string;
    ville: string;

    professionnels?: Professionnel[];
}

export type AdresseCreateDto = Omit<Adresse, "id" | "professionnels">;

export type AdresseUpdateDto = Partial<AdresseCreateDto>;
