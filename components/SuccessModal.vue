<template>
  <div class="success-message">
    <img src="../assets/images/success.svg" alt="Sucesso!" />
    <h2>Agendamento realizado com sucesso!</h2>
    <p>
      Em breve, o profissional entrará em contato para alinhar as informações
      sobre o agendamento e o pagamento.
    </p>
    <button class="primary-btn" @click="closeModal">Fechar</button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ closeModal: () => void }>();
</script>

<style lang="css" scoped>
.success-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
}

img {
  width: 150px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  color: var(--primary-color);
}

p {
  color: var(--tertiary-text);
}

button {
  margin-top: 25px;
}
</style>
