import { registerPatientRepository } from "./repositories/patient/registerPatientRepository";
import { registerProfessionnelRepository } from "./repositories/prof/registerProfessionnelRepository";

export function registerRepositories()
{
    registerPatientRepository();
    registerProfessionnelRepository();

}
