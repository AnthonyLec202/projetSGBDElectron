
import Seance from "src/shared/seance";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";


export class SeanceRepository{
    private dbclient: PrismaClient;
    constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }
    let adapter = new PrismaMariaDb(databaseUrl);
    this.dbclient = new PrismaClient({ adapter });
    }

    async getSeances(): Promise<Seance[]>{
        let seances = await this.dbclient.seances.findMany();

        return seances.map((s: any) => {
              return {
                id_seance: s.id_seance,
                type_seance: s.type_seance,
                date_heure: s.date_heure,
                duree_seance: s.duree_seance,
                notes: s.notes
              } as Seance;
            })
    }

    async addSeance(seance: Seance): Promise<void>{
      const {patientIdToConnect} = seance;
      await this.dbclient.seances.create({
        data:{
          type_seance: seance.type_seance,
          date_heure: seance.date_heure,
          duree_seance: seance.duree_seance,
          notes: seance.notes,

          patients: {
            connect: {
              id_patient: patientIdToConnect
            }
          }
        }
      })
    }
}