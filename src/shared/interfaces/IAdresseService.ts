import { Adresse } from "../adresse"

export default interface IAdresseService{
    searchAdresses:(query: string) => Promise<Adresse[]>
}