import { Patient, PatientCreateDto, PatientUpdateDto, SexeType } from "src/shared/patient";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, patients_sexe } from "@prisma/client";

export class PatientRepository {
  private dbclient: PrismaClient;
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }
    let adapter = new PrismaMariaDb(databaseUrl);
    this.dbclient = new PrismaClient({ adapter });
  }

  async getPatients(): Promise<Patient[]> {
    let patients = await this.dbclient.patients.findMany();

    return patients.map((p) => {
      return {
        id: p.id_patient,
        nom: p.nom,
        prenom: p.prenom,
        dateNaissance: p.date_naissance || null,
        sexe: (p.sexe as SexeType) || null,
        tel: p.tel || null,
        email: p.email || null
      } as Patient;
    })
  };

  async getPatientById(id: number): Promise<Patient | null> {
      
    const patientFromDb = await this.dbclient.patients.findUnique({
      where: {
        id_patient: id 
      }
    });

    if (!patientFromDb) {
      return null;
    }

    return {
      id: patientFromDb.id_patient,
      nom: patientFromDb.nom,
      prenom: patientFromDb.prenom,
      dateNaissance: patientFromDb.date_naissance || null,
      sexe: (patientFromDb.sexe as SexeType) || null,
      tel: patientFromDb.tel || null,
      email: patientFromDb.email || null
    } as Patient;
  }

  async addPatient(patientDto: PatientCreateDto): Promise<Patient> {
    
    const newPatient = await this.dbclient.patients.create({
      data: {
        nom: patientDto.nom,
        prenom: patientDto.prenom,
        date_naissance: patientDto.dateNaissance || null,
        sexe: patientDto.sexe as patients_sexe || null,
        tel: patientDto.tel || null,
        email: patientDto.email || null
      }
    });

  
    return {
        id: newPatient.id_patient,
        nom: newPatient.nom,
        prenom: newPatient.prenom,
        dateNaissance: newPatient.date_naissance || null,
        sexe: (newPatient.sexe as SexeType) || null,
        tel: newPatient.tel || null,
        email: newPatient.email || null
    } as Patient;
   }

  async deletePatient(id: number): Promise<void>{
    await this.dbclient.patients.delete({
      where: {
        id_patient: id
      }
    });
  }

  async updatePatient(id: number, patientDto: PatientUpdateDto): Promise<Patient> {
     
    const updatedPatient = await this.dbclient.patients.update({
      where: {
        id_patient: id 
      },
      data: {
        nom: patientDto.nom,
        prenom: patientDto.prenom,
        date_naissance: patientDto.dateNaissance || null,
        sexe: (patientDto.sexe as SexeType) || null,
        tel: patientDto.tel || null,
        email: patientDto.email || null
      }
    });

    return {
      id: updatedPatient.id_patient,
      nom: updatedPatient.nom,
      prenom: updatedPatient.prenom,
      dateNaissance: updatedPatient.date_naissance || null,
      sexe: (updatedPatient.sexe as SexeType) || null,
      tel: updatedPatient.tel || null,
      email: updatedPatient.email || null,
    } as Patient;
  }
}

