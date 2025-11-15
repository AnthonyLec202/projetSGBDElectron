import { Adresse } from "src/shared/adresse";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { Professionnel } from "src/shared/professionnel";

export class ProfessionnelRepository{
    private dbclient: PrismaClient;
      constructor() {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
          throw new Error('DATABASE_URL environment variable is not defined');
        }
        let adapter = new PrismaMariaDb(databaseUrl);
        this.dbclient = new PrismaClient({ adapter });
      }
    
      async getProfessionnels(): Promise<Professionnel[]>{
        let professionnels = await this.dbclient.professionnels.findMany({
            include: {
                professionnels_adresses: {
                    include: {
                        adresses: true,
                    },
                }
            }
        });

        return professionnels.map((pro) => {
            return {
                id: pro.id_professionnel,
                nom: pro.nom_pro,
                prenom: pro.prenom_pro || null,
                specialite: pro.specialite,
                email: pro.email_pro,
                tel: pro.tel_pro,

                adresses: pro.professionnels_adresses.map((pa) => {
                    const adr = pa.adresses;
                    return {
                        id: adr.id_adresse,
                        rue: adr.rue,
                        numero: adr.numero,
                        codePostal: adr.code_postal,
                        ville: adr.ville
                    } as Adresse;
                }),
            } as Professionnel;
        });
      }
}