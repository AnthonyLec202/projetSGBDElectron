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
        dateNaissance: p.date_naissance || null, // 'date_naissance' (DB) devient 'dateNaissance' (App)
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

    const { id_patient, sexe: sexeFromDb, date_naissance, ...rest } = patientFromDb;
    
    return {
      id: id_patient,
      dateNaissance: date_naissance,
      ...rest,
      sexe: (sexeFromDb as SexeType) || null
    } as Patient;
  }

  async addPatient(patientDto: PatientCreateDto): Promise<Patient> {
    
    const dataForDb = {
        nom: patientDto.nom,
        prenom: patientDto.prenom,
        date_naissance: patientDto.dateNaissance || null,
        sexe: (patientDto.sexe as patients_sexe) || null,
        tel: patientDto.tel || null,
        email: patientDto.email || null
    };

    
    const newPatient = await this.dbclient.patients.create({
      data: dataForDb
    });

    const { id_patient, sexe, date_naissance, ...rest } = newPatient;

    return {
        id: id_patient,
        dateNaissance: date_naissance,
        ...rest,
        sexe: (sexe as SexeType) || null
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
     
    const { sexe, dateNaissance, ...otherData } = patientDto;

    const dataForDb: { [key: string]: any } = {
        ...otherData, 
    };

    if (sexe !== undefined) {
        dataForDb.sexe = (sexe as patients_sexe) || null;
    }

    if (dateNaissance !== undefined) {
        dataForDb.date_naissance = dateNaissance || null;
    }

    const updatedPatientFromDb = await this.dbclient.patients.update({
      where: {
        id_patient: id 
      },
      data: dataForDb
    });

    const { id_patient, sexe: sexeFromDb, date_naissance, ...rest } = updatedPatientFromDb;
    
    return {
      id: id_patient,
      dateNaissance: date_naissance,
      ...rest,
      
      sexe: (sexeFromDb as SexeType) || null 
    } as Patient;
  }
}

