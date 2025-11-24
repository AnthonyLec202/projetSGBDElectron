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
        
        const operationsDeLiaison = professionneldto.idsAdresses.map(idAdresse => {
            return {
                adresses: {
                    connect: { id_adresse: idAdresse }
                }
            };
        });

        const dataForDb: any = {
            nom_pro: professionneldto.nom,
            prenom_pro: professionneldto.prenom || null,
            specialite: professionneldto.specialite,
            email_pro: professionneldto.email || null,
            tel_pro: professionneldto.tel || null,
        };

        if (operationsDeLiaison.length > 0) {
            dataForDb.professionnels_adresses = {
                create: operationsDeLiaison
            };
        }

        
        const newProFromDb = await this.dbclient.professionnels.create({
            data: dataForDb,
                
            include: {
                professionnels_adresses: {
                    include: {
                        adresses: true
                        }
                    }
                }
            });

        const adressesMappees: Adresse[] = newProFromDb.professionnels_adresses.map(pa => {
            const adr = pa.adresses;
            return {
                id: adr.id_adresse,
                rue: adr.rue,
                numero: adr.numero,
                codePostal: adr.code_postal, 
                ville: adr.ville
            };
        });

            
        return {
            id: newProFromDb.id_professionnel,
            nom: newProFromDb.nom_pro,
            prenom: newProFromDb.prenom_pro,
            specialite: newProFromDb.specialite,
            email: newProFromDb.email_pro,
            tel: newProFromDb.tel_pro,
            adresses: adressesMappees
        };
    }

    async deleteProfessionnel(id: number): Promise<Professionnel> {
        
        
        const deletedProFromDb = await this.dbclient.professionnels.delete({
            where: {
                id_professionnel: id
            },
            include: {
                professionnels_adresses: { include: { adresses: true } }
            }
        });

        const adressesMappees = deletedProFromDb.professionnels_adresses.map(pa => ({
            id: pa.adresses.id_adresse,
            rue: pa.adresses.rue,
            numero: pa.adresses.numero,
            codePostal: pa.adresses.code_postal,
            ville: pa.adresses.ville
        }));
        
        return {
            id: deletedProFromDb.id_professionnel,
            nom: deletedProFromDb.nom_pro,
            prenom: deletedProFromDb.prenom_pro,
            specialite: deletedProFromDb.specialite,
            email: deletedProFromDb.email_pro,
            tel: deletedProFromDb.tel_pro,
            adresses: adressesMappees
        };
    }

    
}