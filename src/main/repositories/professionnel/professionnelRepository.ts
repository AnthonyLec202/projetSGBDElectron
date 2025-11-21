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
                    } as Adresse;
                }),
            } as Professionnel;
        });
    }

    async addProfessionnel(dto: ProfessionnelCreateDto): Promise<Professionnel> {
        
        console.log("--- 🟢 [REPO] DÉBUT addProfessionnel ---");
        console.log("1. DTO Reçu du Frontend:", JSON.stringify(dto, null, 2));

        // --- ÉTAPE 1 : Préparation de la Jointure ---
        // On prépare un tableau qui contiendra toutes les opérations 
        // à effectuer dans la table de jointure 'professionnels_adresses'.
        const operationsJointure: any[] = [];

        // A. Cas : Créer de NOUVELLES adresses (Nested Create)
        if (dto.adresseACreer && dto.adresseACreer.length > 0) {
            dto.adresseACreer.forEach((addr, idx) => {
                console.log(`   - Préparation création adresse #${idx+1}: ${addr.ville}`);
                operationsJointure.push({
                    // On cible la relation vers la table 'adresses'
                    adresses: {
                        create: { // Action : CRÉER une nouvelle adresse
                            rue: addr.rue,
                            numero: addr.numero || null,
                            code_postal: addr.codePostal,
                            ville: addr.ville
                        }
                    }
                });
            });
        }

        // B. Cas : Lier à des adresses EXISTANTES (Nested Connect)
        if (dto.idAdressesExistantes && dto.idAdressesExistantes.length > 0) {
            dto.idAdressesExistantes.forEach(id => {
                console.log(`   - Préparation liaison adresse existante ID: ${id}`);
                operationsJointure.push({
                    // On cible la relation vers la table 'adresses'
                    adresses: {
                        connect: { // Action : CONNECTER une adresse existante
                            id_adresse: id 
                        }
                    }
                });
            });
        }

        // --- ÉTAPE 2 : Construction de l'objet 'data' pour Prisma ---
        // On commence avec les champs simples obligatoires
        const dataForDb: any = {
            nom_pro: dto.nom,
            prenom_pro: dto.prenom || null,
            specialite: dto.specialite,
            email_pro: dto.email || null,
            tel_pro: dto.tel || null,
        };

        // IMPORTANT : On n'ajoute la clé 'professionnels_adresses' QUE si nécessaire.
        if (operationsJointure.length > 0) {
            dataForDb.professionnels_adresses = {
                create: operationsJointure
            };
        }

        console.log("2. Payload envoyé à Prisma (data):", JSON.stringify(dataForDb, null, 2));

        try {
            // --- ÉTAPE 3 : Exécution de la Transaction ---
            const newProFromDb = await this.dbclient.professionnels.create({
                data: dataForDb,
                // On demande à récupérer les adresses créées/liées pour le retour
                include: {
                    professionnels_adresses: {
                        include: {
                            adresses: true
                        }
                    }
                }
            });

            console.log("--- ✅ [REPO] SUCCÈS PRISMA --- ID:", newProFromDb.id_professionnel);

            // --- ÉTAPE 4 : Mappage de Sortie (Flattening) ---
            // On transforme le résultat complexe de la DB en DTO propre
            
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

            // Retour de l'objet Professionnel complet
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
            console.error("--- 🔴 [REPO] ERREUR PRISMA ---");
            console.error(error);
            // On propage l'erreur pour que le frontend soit notifié
            throw error;
        }
    }
}