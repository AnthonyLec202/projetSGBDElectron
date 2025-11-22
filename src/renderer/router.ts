import { createRouter, createMemoryHistory } from "vue-router";

import AddPatientForm from "./pages/patient/AddPatientForm.vue";
import UpdatePatientForm from "./pages/patient/UpdatePatientForm.vue";
import Professionnel from "./pages/Professionnel.vue";
import Patient from "./pages/Patient.vue";
import Adresse from "./pages/Adresse.vue";
import AddAddressForm from "./pages/adresse/AddAddressForm.vue";
import UpdateAddressForm from "./pages/adresse/UpdateAddressForm.vue";
import AddProfessionnelForm from "./pages/professionnel/AddProfessionnelForm.vue";



const routes = [
    { path: "/", component: Patient},
    { path: "/add-patient", component: AddPatientForm},
    { path: "/update-patient/:id", component: UpdatePatientForm},
    { path: "/professionnels", component: Professionnel},
    { path: "/add-professionnel", component: AddProfessionnelForm},
    { path: "/adresses", component: Adresse},
    { path: "/add-address", component: AddAddressForm},
    { path: "/update-address/:id", component: UpdateAddressForm},
    
]

export const router = createRouter({routes, history: createMemoryHistory()});