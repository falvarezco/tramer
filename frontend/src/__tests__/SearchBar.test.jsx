import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from '../components/SearchBar';

const mockStore = {
  searchTerm: '',
  loading: false,
  setSearchTerm: vi.fn(),
  searchProducts: vi.fn(),
};

vi.mock('../stores/usePriceStore', () => ({
  default: vi.fn(() => mockStore),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search input and button', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/buscar producto/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('calls setSearchTerm on input change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/buscar producto/i);
    fireEvent.change(input, { target: { value: 'leche' } });
    expect(mockStore.setSearchTerm).toHaveBeenCalledWith('leche');
  });

  it('calls searchProducts on form submit', () => {
    mockStore.searchTerm = 'arroz';
    render(<SearchBar />);
    fireEvent.submit(screen.getByRole('button', { name: /buscar/i }).closest('form'));
    expect(mockStore.searchProducts).toHaveBeenCalledWith('arroz');
  });

  it('shows loading text when loading', () => {
    mockStore.loading = true;
    render(<SearchBar />);
    expect(screen.getByRole('button', { name: /buscando/i })).toBeDisabled();
  });
});
