import { Adresse } from "./adresse";

export interface Professionnel{
    id: number;
    nom: string;
    prenom: string | null;
    specialite: string;
    email: string | null;
    tel: string | null;
    

    adresses?: Adresse[];
}

export type ProfessionnelCreateDto = Omit<Professionnel, 'id'>;

export type ProfessionnelUpdateDto = Partial<ProfessionnelCreateDto>;
