import { registerPatientRepository } from "./repositories/registerPatientRepository";
import { registerSeanceRepository } from "./repositories/registerSeanceRepository";

export function registerRepositories()
{
    registerPatientRepository();
    registerSeanceRepository();
}
