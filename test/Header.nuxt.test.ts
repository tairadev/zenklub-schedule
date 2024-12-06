import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('renders the logo correctly', () => {
    const wrapper = mount(Header);
    const logo = wrapper.find('img');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('src')).toBe('/logo.svg');
  });

  it('displays the correct timezone', () => {
    const wrapper = mount(Header);
    const timezoneText = wrapper.find('p');
    const timezone = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.replace(/_/g, ' ');
    expect(timezoneText.text()).toContain(timezone);
  });

  it('has the correct class for the header element', () => {
    const wrapper = mount(Header);
    const header = wrapper.find('.header');
    expect(header.exists()).toBe(true);
    expect(header.classes()).toContain('header');
  });
});
