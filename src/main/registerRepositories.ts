import { registerAdresseRepository } from "./repositories/adresse/registerAdresseRepository";
import { registerPatientRepository } from "./repositories/patient/registerPatientRepository";
import { registerProfessionnelRepository } from "./repositories/professionnel/registerProfessionnelRepository";

export function registerRepositories()
{
    registerPatientRepository();
    registerProfessionnelRepository();
    registerAdresseRepository();

}
