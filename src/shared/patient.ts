

// Définition d'un type simple pour le sexe (le frontend ne connaît pas Prisma)
export type SexeType = "M" | "F";

// Interface de lecture "Patient" 
export interface Patient {
  id: number; // Non-optionnel
  nom: string;
  prenom: string;
  date_naissance: Date | null;
  sexe: SexeType | null; // Utilise le type simple
  tel: string | null;
  email: string | null;
}

// Interface d'ajout (on retire l'id qui est AUTO INCREMENT)
export type PatientCreateDto = Omit<Patient, 'id'>;

// Interface de mise à jour (Partial rend les champs optionnels)
export type PatientUpdateDto = Partial<PatientCreateDto>;
