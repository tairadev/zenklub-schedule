<template>
  <div class="professional-infos">
    <div class="professional-infos-header">
      <div class="professional-infos-header-left">
        <img :src="professional.avatar || '/avatar.png'" alt="Avatar" />
        <div>
          <h2>{{ professional.name }}</h2>
          <h3>
            {{ professional.ocupation }}
            <span>| {{ professional.location }}</span>
          </h3>
          <div class="stars-container">
            <div
              class="stars"
              :style="`--rating: ${professional.rate}`"
              aria-label="Rating of this product is 2.3 out of 5."
            ></div>
            <span>({{ professional.reviews }} avaliações)</span>
          </div>
          <h4>
            R${{ professional.price.toFixed(2).replace('.', ',') }}
            <span>/ 50 MINUTOS</span>
          </h4>
        </div>
      </div>
      <button class="primary-btn" @click="openSchedule(professional)">
        Agendar
      </button>
    </div>
    <p>
      {{ professional.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Professional } from '~/interfaces/Professional';
import { useWebsiteStore } from '@/stores/website';

defineProps<{ professional: Professional }>();

const websiteStore = useWebsiteStore();

function openSchedule(professional: Professional) {
  websiteStore.setSelectedProfessional(professional);
  websiteStore.setShowModal(true);
}
</script>

<style lang="css" scoped>
.professional-infos {
  width: 100%;
  max-width: 1000px;
  padding: 0 24px;
  margin: 0 auto;
}

.professional-infos .professional-infos-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.professional-infos .professional-infos-header .professional-infos-header-left {
  display: flex;
  align-items: center;
  gap: 25px;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  img {
  width: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  h2 {
  font-size: 24px;
  color: var(--title-color);
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  h3 {
  text-transform: uppercase;
  font-size: 18px;
  color: var(--primary-color);
  letter-spacing: 1.2px;
  margin: 10px 0px 5px;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  h3
  span {
  font-size: 16px;
  color: var(--secondary-text);
  text-transform: capitalize;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  .stars-container {
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  .stars-container
  .stars {
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: 32px;
  font-family: Times;
  line-height: 1;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  .stars-container
  .stars::before {
  content: '★★★★★';
  max-width: 100px;
  letter-spacing: 3px;
  background: linear-gradient(
    90deg,
    var(--star-color) var(--percent),
    var(--star-bg) var(--percent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  .stars-container
  span {
  display: inline-block;
  margin-top: 3px;
  font-size: 15px;
  color: var(--secondary-text);
  letter-spacing: 1px;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  h4 {
  font-size: 17px;
  color: var(--tertiary-text);
  font-weight: 700;
}

.professional-infos
  .professional-infos-header
  .professional-infos-header-left
  div
  h4
  span {
  font-size: 14px;
}

.professional-infos p {
  font-size: 16px;
  margin: 25px 0 0;
  color: var(--infos-text);
  line-height: 1.3;
}

@media (max-width: 768px) {
  .professional-infos
    .professional-infos-header
    .professional-infos-header-left
    img {
    width: 100%;
    max-width: 150px;
  }

  .professional-infos
    .professional-infos-header
    .professional-infos-header-left
    div
    h2 {
    font-size: 21px;
  }

  .professional-infos
    .professional-infos-header
    .professional-infos-header-left
    div
    h3 {
    margin: 5px 0;
    font-size: 16px;
  }

  .professional-infos
    .professional-infos-header
    .professional-infos-header-left
    div
    h4 {
    font-size: 15px;
  }

  .professional-infos
    .professional-infos-header
    .professional-infos-header-left
    div
    .stars-container
    .stars {
    font-size: 26px;
  }

  .professional-infos p {
    margin: 15px 0 0;
  }
}

@media (max-width: 576px) {
  .professional-infos .professional-infos-header {
    flex-direction: column;
    gap: 25px;
  }

  .professional-infos
    .professional-infos-header
    .professional-infos-header-left {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .professional-infos
    .professional-infos-header
    .professional-infos-header-left
    img {
    max-width: 200px;
  }
}
</style>
