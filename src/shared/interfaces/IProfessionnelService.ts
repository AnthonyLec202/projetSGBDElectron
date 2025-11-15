
import { Professionnel } from "../professionnel"

export default interface IProfessionnelService{
    getProfessionnels:() => Promise<Professionnel[]>
}