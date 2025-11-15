import { createRouter, createMemoryHistory } from "vue-router";

import AddPatientForm from "./pages/patient/AddPatientForm.vue";
import UpdatePatientForm from "./pages/patient/UpdatePatientForm.vue";
import Professionnel from "./pages/Professionnel.vue";
import Patient from "./pages/Patient.vue";



const routes = [
    { path: "/", component: Patient},
    { path: "/add-patient", component: AddPatientForm},
    { path: "/update-patient/:id", component: UpdatePatientForm},
    { path: "/professionnels", component: Professionnel}
    
]

export const router = createRouter({routes, history: createMemoryHistory()});