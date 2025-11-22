import { Adresse } from "src/shared/adresse";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { Professionnel, ProfessionnelCreateDto } from "src/shared/professionnel";


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
                    };
                }),
            };
        });
    }

    async addProfessionnel(professionneldto: ProfessionnelCreateDto): Promise<Professionnel> {
        
        

        // 1. PRÉPARATION DE LA LIAISON
        // On transforme la liste simple d'IDs [1, 5, 8] en objets Prisma pour la table de jointure.
        // Pour chaque ID, on dit : "Crée une ligne dans la table de jointure en CONNECTANT l'adresse X"
        
        const operationsDeLiaison = professionneldto.idsAdresses.map(idAdresse => {
            return {
                // On cible la relation 'adresses' dans la table de jointure
                adresses: {
                    connect: { id_adresse: idAdresse }
                }
            };
        });

        // 2. CONSTRUCTION DE L'OBJET DATA
        const dataForDb: any = {
            nom_pro: professionneldto.nom,
            prenom_pro: professionneldto.prenom || null,
            specialite: professionneldto.specialite,
            email_pro: professionneldto.email || null,
            tel_pro: professionneldto.tel || null,
        };

        // On ajoute la relation SEULEMENT si on a sélectionné des adresses
        if (operationsDeLiaison.length > 0) {
            dataForDb.professionnels_adresses = {
                create: operationsDeLiaison
            };
        }

        try {
            // 3. EXÉCUTION
            const newProFromDb = await this.dbclient.professionnels.create({
                data: dataForDb,
                // Important : On inclut la relation pour pouvoir renvoyer l'objet complet au frontend
                include: {
                    professionnels_adresses: {
                        include: {
                            adresses: true
                        }
                    }
                }
            });

            

            // 4. MAPPAGE DE SORTIE (Flattening)
            // On transforme le résultat imbriqué de la DB en liste propre d'adresses
            const adressesMappees: Adresse[] = newProFromDb.professionnels_adresses.map(pa => {
                const adr = pa.adresses;
                return {
                    id: adr.id_adresse,
                    rue: adr.rue,
                    numero: adr.numero,
                    codePostal: adr.code_postal, // Traduction snake_case -> camelCase
                    ville: adr.ville
                };
            });

            // Retour de l'objet final
            return {
                id: newProFromDb.id_professionnel,
                nom: newProFromDb.nom_pro,
                prenom: newProFromDb.prenom_pro,
                specialite: newProFromDb.specialite,
                email: newProFromDb.email_pro,
                tel: newProFromDb.tel_pro,
                adresses: adressesMappees
            } as Professionnel;

        } catch (error) {
            console.error("--- 🔴 Erreur Prisma ---", error);
            throw error;
        }
    }

    
}