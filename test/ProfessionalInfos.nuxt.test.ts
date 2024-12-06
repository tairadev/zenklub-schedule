import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/vue';
import ProfessionalInfos from '@/components/ProfessionalInfos.vue';

vi.mock('vue-router', () => ({
  RouterLink: {
    render: () => {},
  },
}));

describe('ProfessionalInfos.vue', () => {
  const professionalMock = {
    id: 1,
    name: 'John Doe',
    avatar: '/avatar.png',
    occupation: 'Web Developer',
    location: 'San Francisco',
    rating: 4.5,
    reviews: 12,
    reviewsCount: 150,
    price: 200.0,
    description: 'Experienced web developer with a passion for coding.',
  };

  test('renders the professional name and occupation', async () => {
    render(ProfessionalInfos, {
      props: {
        professional: professionalMock,
      },
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('renders the price with the correct format', async () => {
    render(ProfessionalInfos, {
      props: {
        professional: professionalMock,
      },
    });

    expect(screen.getByText('R$200,00')).toBeInTheDocument();
  });

  test('renders the description', async () => {
    render(ProfessionalInfos, {
      props: {
        professional: professionalMock,
      },
    });

    expect(
      screen.getByText('Experienced web developer with a passion for coding.')
    ).toBeInTheDocument();
  });
});
