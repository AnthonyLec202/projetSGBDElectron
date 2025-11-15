import { Prof } from "./professionnel";


export interface Adresse {
    id: number;
    rue: string;
    numero: string | null;
    codePostal: string;
    ville: string;

    professionnels?: Prof[];
}

export type AdresseCreateDto = Omit<Adresse, "id">;

export type AdresseUpdateDto = Partial<AdresseCreateDto>;
