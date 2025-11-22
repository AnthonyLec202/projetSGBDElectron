import { Adresse, AdresseCreateDto, AdresseUpdateDto } from "../adresse"

export default interface IAdresseService{
    getAddresses:() => Promise<Adresse[]>,
    getAddressById:(id: number) => Promise<Adresse | null>,
    addAddress:(adresseDto: AdresseCreateDto) => Promise<Adresse>,
    deleteAddress:(id: number) => Promise<Adresse>,
    updateAddress:(id: number, adresseDto: AdresseUpdateDto) => Promise<Adresse>
}