import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act } from '@testing-library/react';

vi.mock('../services/api', () => ({
  comparePrices: vi.fn(),
  fetchHistory: vi.fn(),
}));

describe('usePriceStore', () => {
  let usePriceStore;
  let api;

  beforeEach(async () => {
    vi.resetModules();
    api = await import('../services/api');
    const mod = await import('../stores/usePriceStore');
    usePriceStore = mod.default;
  });

  it('has correct initial state', () => {
    const state = usePriceStore.getState();
    expect(state.searchTerm).toBe('');
    expect(state.loading).toBe(false);
    expect(state.priceData).toEqual([]);
    expect(state.selectedProduct).toBeNull();
    expect(state.priceHistory).toHaveLength(7);
  });

  it('setSearchTerm updates the search term', () => {
    act(() => {
      usePriceStore.getState().setSearchTerm('leche');
    });
    expect(usePriceStore.getState().searchTerm).toBe('leche');
  });

  it('searchProducts sets loading and updates priceData on success', async () => {
    const mockResults = [{ product: 'Leche', stores: [] }];
    api.comparePrices.mockResolvedValue(mockResults);

    await act(async () => {
      await usePriceStore.getState().searchProducts('leche');
    });

    expect(usePriceStore.getState().loading).toBe(false);
    expect(usePriceStore.getState().priceData).toEqual(mockResults);
  });

  it('searchProducts falls back to mock data on error', async () => {
    api.comparePrices.mockRejectedValue(new Error('Network error'));

    await act(async () => {
      await usePriceStore.getState().searchProducts('leche');
    });

    expect(usePriceStore.getState().loading).toBe(false);
    expect(usePriceStore.getState().priceData).toHaveLength(2);
  });
});
