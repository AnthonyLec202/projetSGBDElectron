<template>
  <div class="planning-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Pour naviguer après le clic

// Imports de FullCalendar
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Nécessaire pour le clic
import { DateClickArg } from '@fullcalendar/interaction';
import { type CalendarOptions} from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr'; // Pour la langue

const router = useRouter();

// Options de configuration du calendrier
const calendarOptions = ref<CalendarOptions>({
  plugins: [
    timeGridPlugin,
    interactionPlugin // Active l'interaction (clic)
  ],
  
  // 1. Affichage Jours/Horaires (8h-20h)
  initialView: 'timeGridWeek', // Vue "Grille de temps par semaine"
  slotMinTime: '08:00:00', // Début à 8h
  slotMaxTime: '20:00:00', // Fin à 20h
  
  // 2. Navigation (Flèches)
  headerToolbar: {
    left: 'prev,next today', // 'prev' et 'next' sont vos flèches
    center: 'title',
    right: 'timeGridWeek,timeGridDay' // Permet de basculer entre semaine et jour
  },
  
  // Paramètres divers
  locale: frLocale, // Mettre en français
  nowIndicator: true, // Affiche la ligne de l'heure actuelle
  allDaySlot: false, // Cache la ligne "Toute la journée"
  
  // 3. Clic sur une tranche horaire
  selectable: true,
  dateClick: handleDateClick, // Appelle notre méthode lors d'un clic
});

/**
 * Gère le clic sur une tranche horaire.
 * C'est le "pont" entre FullCalendar et votre logique métier.
 */
function handleDateClick(clickInfo: DateClickArg) {
  // clickInfo.date contient l'horodatage exact sur lequel l'utilisateur a cliqué
  console.log('Tranche horaire cliquée:', clickInfo.date);
  
  // C'est ici que vous déclenchez votre logique applicative :
  // Par exemple, rediriger vers la page d'ajout de séance
  // en passant la date en paramètre.
  
  
  
  // Navigue vers la page de création, en passant la date
  router.push('/add-seance');
}

</script>

<style>
/* Style pour s'assurer que le calendrier prend de la place */
.planning-container {
  max-width: 1100px;
  margin: 20px auto;
}
</style>