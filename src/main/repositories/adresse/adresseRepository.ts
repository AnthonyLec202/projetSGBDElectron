import { Adresse, AdresseCreateDto, AdresseUpdateDto } from "src/shared/adresse";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
import { Patient } from "src/shared/patient";

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

    
    async getAddresses(): Promise<Adresse[]>{
        const adresses = await this.dbclient.adresses.findMany();

        return adresses.map((a) => ({
            id: a.id_adresse,
            rue: a.rue,
            numero: a.numero,
            codePostal: a.code_postal,
            ville: a.ville
        }));  
    }

    async getAddressById(id: number): Promise<Adresse | null> {
        const adresse = await this.dbclient.adresses.findUnique({
          where: {
            id_adresse: id
          }
        });

        if(!adresse)
          return null;

        return {
          id: adresse.id_adresse,
          rue: adresse.rue,
          numero: adresse.numero,
          codePostal: adresse.code_postal,
          ville: adresse.ville
        }
    }

    async addAddress(adresseDto: AdresseCreateDto): Promise<Adresse> {

      const newAdress = await this.dbclient.adresses.create({
        data: {
          rue: adresseDto.rue,
          numero: adresseDto.numero,
          code_postal: adresseDto.codePostal,
          ville: adresseDto.ville,
        }
      })

      return {
        id: newAdress.id_adresse,
        rue: newAdress.rue,
        numero: newAdress.numero,
        codePostal: newAdress.code_postal,
        ville: newAdress.ville
      };
    }

    async deleteAddress(id: number): Promise<Adresse> {
      const deletedAdress = await this.dbclient.adresses.delete({
        where: {
          id_adresse: id
        }
      });

      return {
        id: deletedAdress.id_adresse,
        rue: deletedAdress.rue,
        numero: deletedAdress.numero,
        codePostal: deletedAdress.code_postal,
        ville: deletedAdress.ville
      }
    }

    async updateAddress(id: number, adresseDto: AdresseUpdateDto): Promise<Adresse>{

      const updatedAdress = await this.dbclient.adresses.update({
        where: {
          id_adresse: id
        },
        data: {
          rue: adresseDto.rue,
          numero: adresseDto.numero,
          code_postal: adresseDto.codePostal,
          ville: adresseDto.ville
        }
      });

      return {
        id: updatedAdress.id_adresse,
        rue: updatedAdress.rue,
        numero: updatedAdress.numero,
        codePostal: updatedAdress.code_postal,
        ville: updatedAdress.ville
      }
    }

    
};