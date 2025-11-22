import { ipcMain } from "electron";
import { AdresseRepository } from "./adresseRepository";
import { Adresse, AdresseCreateDto, AdresseUpdateDto } from "src/shared/adresse";


export function registerAdresseRepository(){
    const adresseRepository = new AdresseRepository();

    ipcMain.handle("adresseRepository:getAddresses", (e, a) => {
        return adresseRepository.getAddresses();
    })

    ipcMain.handle("adresseRepository:getAddressById", (e, id: number) => {
        return adresseRepository.getAddressById(id);
    })

    ipcMain.handle("adresseRepository:addAddress", (e, adresseDto: AdresseCreateDto) => {
        return adresseRepository.addAddress(adresseDto);
    })

    ipcMain.handle("adresseRepository:deleteAddress", (e, id: number) => {
        return adresseRepository.deleteAddress(id);
    })

    ipcMain.handle("adresseRepository:updateAddress", (e, id: number, adresseDto: AdresseUpdateDto) => {
        return adresseRepository.updateAddress(id, adresseDto);
    })



}