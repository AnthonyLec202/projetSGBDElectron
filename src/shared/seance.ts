import Patient from "./patient";


export default interface Seance 
{
    id_seance?: number,
    type_seance: string,
    date_heure: Date,
    duree_seance?: number | null,
    notes?: string | null,
    
    patientIdToConnect: number


}