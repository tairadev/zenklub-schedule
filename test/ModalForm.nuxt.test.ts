import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Form from '../components/ModalForm.vue';
import {
  isValidCPF,
  isValidName,
  isValidEmail,
  isValidPhone,
} from '../helpers/StringHelpers';

describe('Form.vue', () => {
  it('should format CPF correctly', async () => {
    const setCpf = vi.fn();
    const wrapper = mount(Form, {
      props: {
        errorMessage: '',
        setName: vi.fn(),
        setEmail: vi.fn(),
        setPhone: vi.fn(),
        setCpf,
      },
    });

    const cpfInput = wrapper.find('#cpf');
    await cpfInput.setValue('12345678901');
    expect(cpfInput.element.value).toBe('123.456.789-01');
    expect(setCpf).toHaveBeenCalledWith('123.456.789-01');
  });

  it('should format phone number correctly', async () => {
    const setPhone = vi.fn();
    const wrapper = mount(Form, {
      props: {
        errorMessage: '',
        setName: vi.fn(),
        setEmail: vi.fn(),
        setPhone,
        setCpf: vi.fn(),
      },
    });

    const phoneInput = wrapper.find('#phone');
    await phoneInput.setValue('11987654321');
    expect(phoneInput.element.value).toBe('(11) 98765-4321');
    expect(setPhone).toHaveBeenCalledWith('(11) 98765-4321');
  });

  it('should display error message if provided', () => {
    const wrapper = mount(Form, {
      props: {
        errorMessage: 'Invalid data',
        setName: vi.fn(),
        setEmail: vi.fn(),
        setPhone: vi.fn(),
        setCpf: vi.fn(),
      },
    });

    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.text()).toBe('Invalid data');
  });

  it('should validate CPF correctly', () => {
    expect(isValidCPF('123.456.789-01')).toBe(true);
    expect(isValidCPF('123.456.789-0')).toBe(false);
    expect(isValidCPF('12345678901')).toBe(false);
    expect(isValidCPF('123.456.78X-01')).toBe(false);
  });

  it('should validate name correctly', () => {
    expect(isValidName('João Silva')).toBe(true);
    expect(isValidName('Jo')).toBe(false);
    expect(isValidName('')).toBe(false);
    expect(isValidName('João')).toBe(false);
    expect(isValidName('João da Silva')).toBe(true);
    expect(isValidName('João123 Silva')).toBe(false);
  });

  it('should validate email correctly', () => {
    expect(isValidEmail('email@example.com')).toBe(true);
    expect(isValidEmail('email.com')).toBe(false);
    expect(isValidEmail('email@.com')).toBe(false);
    expect(isValidEmail('email@domain')).toBe(false);
  });

  it('should validate phone number correctly', () => {
    expect(isValidPhone('(11) 98765-4321')).toBe(true);
    expect(isValidPhone('11987654321')).toBe(false);
    expect(isValidPhone('(11) 987654321')).toBe(false);
    expect(isValidPhone('(11) 9876-4321')).toBe(true);
    expect(isValidPhone('(11) 98765-432X')).toBe(false);
  });
});
