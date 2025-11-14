import Patient from "src/shared/patient";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

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

    return patients.map((p: any) => {
      return {
        id: p.id_patient,
        nom: p.nom,
        prenom: p.prenom
      } as Patient;
    })
  };

  async addPatient(patient: Patient): Promise<void>{
    await this.dbclient.patients.create({
      data:{
        nom: patient.nom,
        prenom: patient.prenom,
        date_naissance: patient.date_naissance,
        sexe: patient.sexe,
        tel: patient.tel,
        email: patient.email
      }
    })
  };

  async deletePatient(id: number): Promise<void>{
    await this.dbclient.patients.delete({
      where: {
        id_patient: id
      }
    });
  }

}

