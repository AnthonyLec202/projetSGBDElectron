
import { Professionnel, ProfessionnelCreateDto } from "../professionnel"

export default interface IProfessionnelService{
    getProfessionnels:() => Promise<Professionnel[]>
    addProfessionnel:(professionnelDto: ProfessionnelCreateDto) => Promise<Professionnel>;
    deleteProfessionnel:(id: number) => Promise<Professionnel>;
}