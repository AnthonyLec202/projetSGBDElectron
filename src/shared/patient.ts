import { patients_sexe } from "@prisma/client";


export default interface Patient {
    id?: number;
    nom: string;
    prenom: string;
    date_naissance?: Date;
    sexe?: patients_sexe;
    tel?: string;
    email?: string;
}

