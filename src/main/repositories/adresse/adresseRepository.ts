import { Adresse } from "src/shared/adresse";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

export class AdresseRepository {
  private dbclient: PrismaClient;
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }
    let adapter = new PrismaMariaDb(databaseUrl);
    this.dbclient = new PrismaClient({ adapter });
    }

    
    async searchAdresses(query: string): Promise<Adresse[]> {
    // 1. Optimisation : ne pas chercher si le texte est trop court
        if (query.length < 3) return [];

    // 2. Requête Prisma avec filtre 'OR' (Rue OU Ville OU Code Postal)
        const results = await this.dbclient.adresses.findMany({
            where: {
                OR: [
                    { rue: { contains: query } },       // Cherche dans la rue
                    { ville: { contains: query } },     // Cherche dans la ville
                    { code_postal: { startsWith: query } } // Commence par le CP
                ]
            },
            take: 5 // Limite à 5 résultats pour ne pas surcharger l'affichage
        });

    // 3. Mappage vers le DTO IAdresse
        return results.map(r => ({
            id: r.id_adresse,
            rue: r.rue,
            numero: r.numero,
            codePostal: r.code_postal,
            ville: r.ville
        }));
    }
};