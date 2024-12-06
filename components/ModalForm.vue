<template>
  <form>
    <label for="name">
      Nome:
      <input
        type="text"
        id="name"
        placeholder="Digite o seu nome completo"
        @input="setName"
      />
    </label>

    <label for="email">
      Email:
      <input
        type="email"
        id="email"
        placeholder="Digite o seu e-mail"
        @input="setEmail"
      />
    </label>

    <label for="cpf">
      CPF:
      <input
        type="text"
        id="cpf"
        placeholder="Digite seu CPF"
        @input="formatCpf"
        maxlength="14"
      />
    </label>

    <label for="phone">
      Telefone:
      <input
        type="text"
        id="phone"
        placeholder="Digite seu telefone"
        @input="formatPhone"
        maxlength="15"
      />
    </label>

    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script lang="ts" setup>
const { setPhone, setCpf, setName, setEmail } = defineProps<{
  errorMessage: string;
  setName: (event: Event) => void;
  setEmail: (event: Event) => void;
  setPhone: (newPhone: string) => void;
  setCpf: (newCpf: string) => void;
}>();

const formatCpf = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = value;
  setCpf(value);
};

const formatPhone = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '($1) $2');
  value = value.replace(/(\d{5})(\d)/, '$1-$2');
  input.value = value;
  setPhone(value);
};
</script>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--primary-color);
  font-weight: 600;
}

form label input {
  background: var(--button-color);
  border: 2px solid var(--input-border-color);
  border-radius: 5px;
  padding: 5px 8px;
  font-weight: 400;
}

form label input:focus {
  outline: 0;
}

form .error-message {
  color: var(--danger-color);
}
</style>
