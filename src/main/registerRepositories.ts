import { registerPatientRepository } from "./repositories/patient/registerPatientRepository";
import { registerProfRepository } from "./repositories/prof/registerProfRepository";

export function registerRepositories()
{
    registerPatientRepository();
    registerProfRepository();

}
