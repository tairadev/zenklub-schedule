<template>
  <nav class="header">
    <RouterLink to="/"><img src="/logo.svg" alt="ZenKlub" /></RouterLink>
    <p><span>Fuso horário:</span> {{ timezone }}</p>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const timezone = ref<string>(
  Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' ')
);
</script>

<style lang="css" scoped>
.header {
  position: sticky;
  z-index: 999;
  left: 0;
  right: 0;
  background-color: var(--primary-color);
  top: 0;
  max-width: 100% !important;
  height: 76px;
  border-radius: 0 0 1.5rem 1.5rem;
  padding: 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header img {
  width: 150px;
}

.header p {
  color: var(--button-color);
}

@media (max-width: 768px) {
  .header {
    padding: 0 24px;
  }

  .header p {
    font-size: 15px;
  }

  .header p span {
    display: none;
  }
}

@media (max-width: 576px) {
  .header img {
    width: 120px;
  }
}
</style>
