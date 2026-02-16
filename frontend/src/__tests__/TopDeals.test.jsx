import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TopDeals from '../components/TopDeals';

describe('TopDeals', () => {
  it('renders the section title', () => {
    render(<TopDeals />);
    expect(screen.getByText(/mejores ofertas/i)).toBeInTheDocument();
  });

  it('renders all three deal cards', () => {
    render(<TopDeals />);
    expect(screen.getByText('Arroz Diana 5kg')).toBeInTheDocument();
    expect(screen.getByText('Aceite Girasol 3L')).toBeInTheDocument();
    expect(screen.getByText('Café Sello Rojo 500g')).toBeInTheDocument();
  });

  it('displays discount percentages', () => {
    render(<TopDeals />);
    expect(screen.getByText('-35%')).toBeInTheDocument();
    expect(screen.getByText('-25%')).toBeInTheDocument();
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });
});
