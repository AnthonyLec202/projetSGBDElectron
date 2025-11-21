import { Adresse, AdresseCreateDto } from "./adresse";

export interface Professionnel{
    id: number;
    nom: string;
    prenom: string | null;
    specialite: string;
    email: string | null;
    tel: string | null;
    
    adresses?: Adresse[];
}

type ProfessionnelBase = Omit<Professionnel, "id" | "adresses">;

export interface ProfessionnelCreateDto extends ProfessionnelBase{
    adresseACreer?: AdresseCreateDto[];
    idAdressesExistantes?: number[];
}

export interface ProfessionnelUpdateDto extends Partial<ProfessionnelCreateDto> {
    idsAdressesADissocier?: number[];
}
