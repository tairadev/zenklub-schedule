import { defineStore } from 'pinia';
import type { Professional } from '~/interfaces/Professional';

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    selectedProfessional: <Professional>{
      id: '',
      name: '',
      location: '',
      ocupation: '',
      price: 0,
      description: '',
      reviews: 0,
      rate: 0,
      avatar: '',
      days: '',
      startsHour: '',
      endHour: '',
      lunchTime: '',
    },
    showModal: false,
  }),
  actions: {
    setSelectedProfessional(professional: Professional) {
      this.selectedProfessional = professional;
    },
    setShowModal(show: boolean) {
      this.showModal = show;
    },
  },
});
