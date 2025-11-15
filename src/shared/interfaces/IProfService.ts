import { Prof } from "../professionnel"

export default interface IProfService{
    getProfessionnels:() => Promise<Prof[]>
}