import { createRouter, createMemoryHistory } from "vue-router";

import Home from "./pages/Home.vue";
import AddPatientForm from "./pages/patient/AddPatientForm.vue";



const routes = [
    { path: '/', component: Home},
    { path: '/add-patient', component: AddPatientForm}
    
]

export const router = createRouter({routes, history: createMemoryHistory()});