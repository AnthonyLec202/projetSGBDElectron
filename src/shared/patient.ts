
export type SexeType = "M" | "F";

export interface Patient {
  id: number; 
  nom: string;
  prenom: string;
  dateNaissance: Date | null;
  sexe: SexeType | null; 
  tel: string | null;
  email: string | null;
}

export type PatientCreateDto = Omit<Patient, 'id'>;

export type PatientUpdateDto = Partial<PatientCreateDto>;
