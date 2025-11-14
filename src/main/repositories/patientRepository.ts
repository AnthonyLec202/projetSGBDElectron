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
        prenom: p.prenom
      } as Patient;
    })
  };

  async addPatient(patientDto: PatientCreateDto): Promise<Patient> {
    
    const dataForDb = {
        nom: patientDto.nom,
        prenom: patientDto.prenom,
        date_naissance: patientDto.date_naissance || null,
        sexe: (patientDto.sexe as patients_sexe) || null,
        tel: patientDto.tel || null,
        email: patientDto.email || null
    };

    
    const newPatient = await this.dbclient.patients.create({
      data: dataForDb
    });

    const { id_patient, sexe, ...rest } = newPatient;

    return {
        id: id_patient,
        ...rest,
        sexe: (sexe as SexeType) || null
    };
   }

  async deletePatient(id: number): Promise<void>{
    await this.dbclient.patients.delete({
      where: {
        id_patient: id
      }
    });
  }


}

