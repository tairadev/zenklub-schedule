<template>
  <div class="schedule-modal" :class="{ active: showModal }">
    <h2 v-if="step < 3">
      {{
        step === 1 ? 'Agende sua consulta:' : 'Preencha os dados para agendar:'
      }}
    </h2>

    <ModalCarousel
      :professional="professional"
      :set-show-modal="setShowModal"
      :set-selected-date="setSelectedDate"
      :selected-date="selectedDate"
      v-if="step === 1"
    />

    <ModalForm
      :set-name="setName"
      :set-email="setEmail"
      :set-phone="setPhone"
      :set-cpf="setCpf"
      :error-message="errorMessage"
      v-else-if="step === 2"
    />

    <SuccessModal v-else-if="step === 3" :close-modal="closeModal" />

    <div class="modal-footer" v-if="step < 3">
      <h3>R${{ professional.price.toFixed(2).replace('.', ',') }}</h3>
      <div class="buttons-container">
        <button class="tertiary-btn" @click="goBack">
          {{ step === 1 ? 'Fechar' : 'Voltar' }}
        </button>
        <button
          class="secondary-btn"
          @click="scheduleAction"
          :disabled="isDisabled"
        >
          Agendar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useWebsiteStore } from '@/stores/website';
import type { Professional } from '~/interfaces/Professional';
import {
  formatDateToISOString,
  isValidCPF,
  isValidEmail,
  isValidName,
  isValidPhone,
} from '~/helpers/StringHelpers';

const websiteStore = useWebsiteStore();

const showModal = ref(websiteStore.showModal);
const professional = ref<Professional>(websiteStore.selectedProfessional);
const selectedDate = ref<string | null>(null);
const step = ref<number>(1);

const name = ref<string>('');
const email = ref<string>('');
const cpf = ref<string>('');
const phone = ref<string>('');

const errorMessage = ref<string>('');

watch(
  () => websiteStore.selectedProfessional,
  (newVal) => {
    professional.value = newVal;
  }
);

watch(
  () => websiteStore.showModal,
  (newVal) => {
    showModal.value = newVal;
  }
);

const setShowModal = (newValue: boolean) => {
  showModal.value = newValue;
};

const closeModal = () => {
  websiteStore.setShowModal(false);
  setTimeout(() => clearInfos(), 500);
};

const goBack = () => {
  if (step.value > 1) {
    step.value = step.value - 1;
  } else {
    clearInfos();
    websiteStore.setShowModal(false);
  }
};

const clearInfos = () => {
  step.value = 1;
  name.value = '';
  email.value = '';
  cpf.value = '';
  phone.value = '';
  selectedDate.value = null;
};

const isDisabled = computed(() => {
  if (step.value === 1) {
    return !selectedDate.value;
  }

  if (step.value === 2) {
    return !(
      isValidName(name.value) &&
      isValidEmail(email.value) &&
      isValidCPF(cpf.value) &&
      isValidPhone(phone.value)
    );
  }

  return true;
});

const scheduleAction = () => {
  errorMessage.value = '';
  if (step.value === 1) step.value = 2;
  else submitSchedule();
};

const setName = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value;
  name.value = value;
};

const setEmail = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value;
  email.value = value;
};

const setPhone = (newPhone: string) => {
  phone.value = newPhone;
};

const setCpf = (newCPF: string) => {
  cpf.value = newCPF;
};

const submitSchedule = async () => {
  try {
    const response = await fetch('/api/schedules', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateTime: formatDateToISOString(selectedDate.value),
        name: name.value,
        phone: phone.value,
        email: email.value,
        document: cpf.value,
        professional_id: professional.value.id,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar o agendamento');
    }

    step.value = 3;
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Erro desconhecido';
    }
  }
};

const setSelectedDate = (date: string, time: string) => {
  selectedDate.value = `${date} ${time}`;
};

onMounted(() => {
  clearInfos();
});
</script>

<style lang="css" scoped>
.schedule-modal {
  position: fixed;
  right: -300%;
  top: 50%;
  transform: translateY(-50%);
  background: var(--modal-background);
  width: 590px;
  padding: 24px 46px;
  border-radius: 16px 0 0 16px;
  box-shadow: var(--modal-shadow);
  transition: 0.4s;
  max-height: 75vh;
  overflow-y: auto;
  max-width: 100vw;
}

h2 {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 22px;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

.schedule-modal.active {
  right: 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.buttons-container {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}

h3 {
  font-size: 19px;
  font-weight: 600;
  color: var(--primary-color);
}
@media (max-width: 576px) {
  .schedule-modal {
    top: 0;
    height: 100vh;
    transform: none;
    max-height: unset;
    padding-top: 100px;
  }
}
</style>
