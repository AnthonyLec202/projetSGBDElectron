
export interface Adresse {
    id: number;
    rue: string;
    numero: string;
    codePostal: string;
    ville: string;

}

export type AdresseCreateDto = Omit<Adresse, "id">;

export type AdresseUpdateDto = Partial<AdresseCreateDto>;
