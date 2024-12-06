# Zenklub App - Teste Técnico

Este projeto é um aplicativo inspirado no **Zenklub**, criado para um teste técnico. A aplicação permite que os usuários acessem uma lista de profissionais de saúde mental, visualizem suas agendas e reservem horários conforme suas necessidades.

## Visão Geral

O Zenklub App oferece uma interface onde o usuário pode:

- Navegar por diversos **profissionais de saúde mental**.
- Visualizar a **agenda** de cada profissional.
- **Reservar horários** com os profissionais disponíveis.

A aplicação foi desenvolvida com **Nuxt.js**, **Prisma** (para gerenciamento de banco de dados), e **Vitest** para testes unitários.

## Configuração

Antes de começar a rodar a aplicação, é necessário instalar as dependências. Execute o comando abaixo para instalar as dependências:

```bash
# Instalar dependências
npm install
```

## Rodando a aplicação

Para iniciar a aplicação em ambiente de desenvolvimento, utilize o seguinte comando:

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em http://localhost:3000 para visualização.

## Scripts

Abaixo estão os principais scripts configurados no projeto:

- Iniciar o ambiente de desenvolvimento:

```bash
npm run dev
Esse comando vai iniciar o servidor de desenvolvimento, onde você pode visualizar a aplicação localmente.
```

- Executar os testes unitários com Vitest:

```bash
npm run test:unit
Este comando executa os testes unitários do projeto utilizando o Vitest.
```

- Construir a aplicação para produção:

```bash
npm run build
Esse comando compila e prepara o projeto para ser executado em um ambiente de produção.
```

## Como funciona

- Dev: Executa o servidor de desenvolvimento, utilizando o Nuxt.js.
- Testes Unitários: Executa os testes unitários com Vitest.
- Build: Compila e prepara o projeto para produção.

## Conclusão

Este repositório contém a base para o Zenklub App e serve como um ponto de partida para explorar o desenvolvimento em Nuxt.js com Prisma e Vitest. Caso tenha mais dúvidas ou queira mais informações sobre a arquitetura e a configuração, consulte a documentação do Nuxt.js e Prisma.
