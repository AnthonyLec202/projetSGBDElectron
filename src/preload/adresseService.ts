import { ipcRenderer } from "electron";
import IAdresseService from "src/shared/interfaces/IAdresseService";
import { Adresse, AdresseCreateDto, AdresseUpdateDto } from "src/shared/adresse";

export function adresseService(): IAdresseService{
    return {
        getAddresses:() => ipcRenderer.invoke("adresseRepository:getAddresses"),
        getAddressById:(id: number) => ipcRenderer.invoke("adresseRepository:getAddressById", id),
        addAddress:(adresseDto: AdresseCreateDto) => ipcRenderer.invoke("adresseRepository:addAddress", adresseDto),
        deleteAddress:(id: number) => ipcRenderer.invoke("adresseRepository:deleteAddress", id),
        updateAddress:(id: number, adresseDto: AdresseUpdateDto) => ipcRenderer.invoke("adresseRepository:updateAddress", id, adresseDto),
    }
}