import { Adresse } from "./adresse";

export interface Prof{
    id: number;
    nom: string;
    prenom: string | null;
    specialite: string;
    email: string | null;
    tel: string | null;
    

    adresses?: Adresse[];
}

export type ProfCreateDto = Omit<Prof, 'id'>;

export type ProfUpdateDto = Partial<ProfCreateDto>;
