export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  sourcemap: false,
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/test-utils/module'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Zenklub',
      meta: [
        {
          name: 'description',
          content:
            'Com os filtros do Zenklub você encontra profissionais em diversas áreas e abordagens. Comece agora a cuidar da sua saúde mental sem sair de casa!',
        },
      ],
    },
  },
});
