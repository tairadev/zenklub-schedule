import { expect, it, describe, beforeEach, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ScheduleModal from '../components/ScheduleModal.vue';
import { useWebsiteStore } from '../stores/website';

vi.mock('@/stores/website', () => ({
  useWebsiteStore: vi.fn(),
}));

const mockWebsiteStore = {
  showModal: false,
  selectedProfessional: { id: 1, price: 100 },
  setShowModal: vi.fn(),
};

describe('ScheduleModal.vue', () => {
  beforeEach(() => {
    (useWebsiteStore as vi.Mock).mockReturnValue(mockWebsiteStore);
  });

  it('should render correctly when the modal is not active', () => {
    const wrapper = shallowMount(ScheduleModal);
    expect(wrapper.find('.schedule-modal').exists()).toBe(true);
    expect(wrapper.classes()).not.toContain('active');
  });

  it('should show the modal when `showModal` is true', async () => {
    mockWebsiteStore.showModal = true;
    const wrapper = shallowMount(ScheduleModal);
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain('active');
  });

  it('should close the modal when the "Close" button is clicked', async () => {
    const wrapper = shallowMount(ScheduleModal, {
      data() {
        return {
          step: 1,
        };
      },
    });

    await wrapper.find('.tertiary-btn').trigger('click');
    expect(mockWebsiteStore.setShowModal).toHaveBeenCalledWith(false);
  });

  it('should disable the "Schedule" button when not filled in', async () => {
    const wrapper = shallowMount(ScheduleModal, {
      data() {
        return {
          step: 1,
          selectedDate: null,
        };
      },
    });

    const button = wrapper.find('.secondary-btn');
    expect(button.attributes('disabled')).toBeDefined();
  });
});
