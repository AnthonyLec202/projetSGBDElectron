<template>
  <nav class="navbar">
    <div class="navbar-content">
      <RouterLink to="/" class="nav-button">
        Home
      </RouterLink>
      <RouterLink to="/professionnels" class="nav-button">
        Professionnels
      </RouterLink>

    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  gap: 1rem;
  max-width: 75%;
  margin: 0 auto;
}

.nav-button {
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #2980b9;
}

.nav-button.router-link-active {
  background-color: #27ae60;
}
</style>