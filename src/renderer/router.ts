import { createRouter, createMemoryHistory } from "vue-router";

import Home from "./pages/Home.vue";
import AddPatientForm from "./pages/patient/AddPatientForm.vue";
import Seances from "./pages/seance/Seances.vue";
import Planning from "./pages/seance/Planning.vue";
import AddSeanceForm from "./pages/seance/AddSeanceForm.vue";


const routes = [
    { path: '/', component: Home},
    { path: '/add-patient', component: AddPatientForm},
    { path: '/seances', component: Seances},
    { path: '/planning', component: Planning},
    { path: '/add-seance', component: AddSeanceForm}
]

export const router = createRouter({routes, history: createMemoryHistory()});