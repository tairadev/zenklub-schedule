<template>
  <div class="professionals-container">
    <ProfessionalInfos
      v-for="(professional, i) in professionals"
      :professional="professional"
      :key="i"
    />
    <ScheduleModal />
  </div>
</template>

<script setup lang="ts">
import ProfessionalInfos from '~/components/ProfessionalInfos.vue';
import ScheduleModal from '~/components/ScheduleModal.vue';
import type { Professional } from '~/interfaces/Professional';
import { ref } from 'vue';

const professionals = ref<Professional[]>([]);

try {
  const data = await $fetch<Professional[] | null>('/api/professionals');

  professionals.value = data ?? [];
} catch (error) {
  console.error('Erro ao buscar profissionais:', error);
}
</script>

<style lang="css" scoped>
.professionals-container {
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin: 50px 0;
}
</style>
