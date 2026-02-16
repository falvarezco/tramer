import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PriceComparisonCard from '../components/PriceComparisonCard';

vi.mock('../stores/usePriceStore', () => ({
  default: vi.fn((selector) =>
    selector({ setSelectedProduct: vi.fn() })
  ),
}));

const mockItem = {
  product: 'Leche Test 1L',
  stores: [
    { store: 'Éxito', price: 3500, discount: 10, available: true },
    { store: 'Carulla', price: 4000, discount: 0, available: true },
    { store: 'Euro', price: 3200, discount: 15, available: false },
  ],
};

describe('PriceComparisonCard', () => {
  it('renders the product name', () => {
    render(<PriceComparisonCard item={mockItem} />);
    expect(screen.getByText('Leche Test 1L')).toBeInTheDocument();
  });

  it('renders all store names', () => {
    render(<PriceComparisonCard item={mockItem} />);
    expect(screen.getByText('Éxito')).toBeInTheDocument();
    expect(screen.getByText('Carulla')).toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
  });

  it('shows best price badge for cheapest store', () => {
    render(<PriceComparisonCard item={mockItem} />);
    expect(screen.getByText('Mejor Precio')).toBeInTheDocument();
  });

  it('shows discount badges', () => {
    render(<PriceComparisonCard item={mockItem} />);
    expect(screen.getByText('-10%')).toBeInTheDocument();
    expect(screen.getByText('-15%')).toBeInTheDocument();
  });

  it('shows unavailable label when store is out of stock', () => {
    render(<PriceComparisonCard item={mockItem} />);
    expect(screen.getByText('No disponible')).toBeInTheDocument();
  });
});
