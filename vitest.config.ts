import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    setupFiles: ['./test/setup.ts'], // Aponte para o caminho correto do seu setup.ts
    globals: true, // Caso queira usar variáveis globais em seus testes
    environment: 'jsdom', // Configure o ambiente de teste, geralmente jsdom para testes com Vue
  },
});
