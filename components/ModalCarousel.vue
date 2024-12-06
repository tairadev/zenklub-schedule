<template>
  <UCarousel
    v-slot="{ item }"
    :items="futureDates"
    :ui="{ item: 'basis-full basis-1/3 sm:basis-1/4 md:basis-1/5' }"
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-left-16-solid',
      class: '-start-8',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-right-16-solid',
      class: '-end-9',
    }"
    arrows
  >
    <ul draggable="false">
      <li class="title" :class="{ disabled: !isWorkingDay(item) }">
        <h4>{{ getWeekDay(item) }}</h4>
        <h3>{{ item.split('/')[0] }}</h3>
        <h5>{{ getMonth(item) }}</h5>
      </li>
      <template v-if="isWorkingDay(item)">
        <template v-for="hour in availableHours">
          <li
            v-if="isAvailable(item, hour)"
            :key="`${item}-${hour}`"
            @click="setSelectedDate(item, hour)"
            :class="{ active: selectedDate === `${item} ${hour}` }"
          >
            {{ hour }}
          </li>
        </template>
      </template>
    </ul>
  </UCarousel>
</template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useWebsiteStore } from '@/stores/website';
import { getMonth, getWeekDay } from '~/helpers/StringHelpers';
import type { Professional } from '~/interfaces/Professional';
import type { Schedules } from '~/interfaces/Schedules';

const { professional, setShowModal, setSelectedDate, selectedDate } =
  defineProps<{
    professional: Professional;
    setShowModal: (newValue: boolean) => void;
    setSelectedDate: (item: string, hour: string) => void;
    selectedDate: string | null;
  }>();

const futureDates = ref<string[]>([]);
const schedules = ref<Schedules[]>([]);

const websiteStore = useWebsiteStore();

watch(
  () => websiteStore.showModal,
  async (newVal) => {
    if (newVal) {
      try {
        const data = await $fetch<Schedules[] | null>(
          `/api/schedules/${professional.id}`
        );
        schedules.value = data ?? [];
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }
    setShowModal(newVal);
  }
);

const isAvailable = (date: string, time: string) => {
  const [day, month, year] = date.split('/').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  const dateToCompare = Date.UTC(year, month - 1, day, hour, minute);

  return !schedules.value.some((item) => {
    const scheduleDate = new Date(item.dateTime).getTime();

    return scheduleDate === dateToCompare;
  });
};

const isWorkingDay = (data: string) => {
  const [day, month, year] = data.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  const adjustedDay = dayOfWeek === 0 ? 1 : dayOfWeek + 1;
  const daysArr = professional.days.split(',');
  return daysArr.includes(adjustedDay.toString());
};

const availableHours = computed(() => {
  const hours: string[] = [];
  if (!professional) return hours;

  const start = parseInt(professional.startsHour);
  const end = parseInt(professional.endHour);
  const lunch = parseInt(professional.lunchTime);

  for (let hour = start; hour < end; hour++) {
    if (hour !== lunch) {
      hours.push(`${hour}:00`);
    }
  }
  return hours;
});

onMounted(() => {
  const today = new Date();
  today.setDate(today.getDate() + 1);

  for (let i = 0; i < 15; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    futureDates.value.push(futureDate.toLocaleDateString());
  }
});
</script>

<style lang="css" scoped>
ul {
  width: 88px;
  padding: 0 8px;
}

ul li {
  background: var(--button-color);
  color: var(--black);
  border: var(--time-border) solid 2px;
  border-radius: 0.5rem;
  padding: 1rem 0;
  width: 88px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 10px;
  cursor: pointer;
}

ul li.title {
  margin-bottom: 16px;
  cursor: default;
}

ul li.title h4 {
  color: var(--carousel-subtitle-color);
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
}

ul li.title h3 {
  color: var(--carousel-title-color);
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
}

ul li.title h5 {
  color: var(--carousel-title-color);
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
}

ul li.title.disabled {
  opacity: 0.32;
}

ul li:not(.title):not(.active):hover {
  background: var(--primary-color);
  color: var(--button-color);
}

ul li.active {
  border: 2px solid var(--primary-color);
  background-color: var(--secondary-color);
  font-weight: 700;
}
</style>
