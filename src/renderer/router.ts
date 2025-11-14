import { createRouter, createMemoryHistory } from "vue-router";

import Home from "./pages/Home.vue";
import AddPatientForm from "./pages/patient/AddPatientForm.vue";
import UpdatePatientForm from "./pages/patient/UpdatePatientForm.vue";



const routes = [
    { path: '/', component: Home},
    { path: '/add-patient', component: AddPatientForm},
    { path: "/update-patient/:id", component: UpdatePatientForm}
    
]

export const router = createRouter({routes, history: createMemoryHistory()});