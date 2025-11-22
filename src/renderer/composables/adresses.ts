import { ref } from "vue";
import { Adresse, AdresseCreateDto, AdresseUpdateDto } from "src/shared/adresse";



export function useAdresses() { 
    const adresses = ref<Adresse[]>([]);
 
    const getAddresses = async() => {
        adresses.value = await window.electronService.adresses.getAddresses();
    };

    const getAddressById = async(id: number) => {
        const address = await window.electronService.adresses.getAddressById(id);
        return address;
    }

    const addAddress = async(adresseDto: AdresseCreateDto) => {
        await window.electronService.adresses.addAddress(adresseDto);
        getAddresses();
    }

    const deleteAddress = async(id: number) => {
        await window.electronService.adresses.deleteAddress(id);
        getAddresses();
    }

    const updateAddress = async(id: number, adresseDto: AdresseUpdateDto) => {
        await window.electronService.adresses.updateAddress(id, adresseDto);
        getAddresses();
    }

    return {
        adresses,
        getAddresses,
        getAddressById,
        addAddress,
        deleteAddress,
        updateAddress
    };
}