import { create } from 'zustand';
import { comparePrices, fetchHistory } from '../services/api';

const mockPriceData = [
  {
    product: 'Leche Alquería 1L',
    stores: [
      { store: 'Éxito', price: 3590, discount: 10, available: true },
      { store: 'Carulla', price: 3850, discount: 0, available: true },
      { store: 'Euro', price: 3450, discount: 15, available: false },
    ],
  },
  {
    product: 'Leche Colanta 1L',
    stores: [
      { store: 'Éxito', price: 3450, discount: 5, available: true },
      { store: 'Carulla', price: 3650, discount: 0, available: true },
      { store: 'Euro', price: 3350, discount: 8, available: true },
    ],
  },
];

const mockPriceHistory = [
  { date: '2024-12-22', exito: 3650, carulla: 3850, euro: 3550 },
  { date: '2024-12-23', exito: 3620, carulla: 3850, euro: 3520 },
  { date: '2024-12-24', exito: 3590, carulla: 3850, euro: 3500 },
  { date: '2024-12-25', exito: 3590, carulla: 3800, euro: 3480 },
  { date: '2024-12-26', exito: 3590, carulla: 3850, euro: 3450 },
  { date: '2024-12-27', exito: 3590, carulla: 3850, euro: 3450 },
  { date: '2024-12-28', exito: 3590, carulla: 3850, euro: 3450 },
];

const usePriceStore = create((set) => ({
  searchTerm: '',
  loading: false,
  priceData: [],
  selectedProduct: null,
  priceHistory: mockPriceHistory,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  searchProducts: async (term) => {
    set({ loading: true });
    try {
      const data = await comparePrices(term);
      set({ priceData: data });
    } catch (error) {
      console.error('Error fetching prices:', error);
      set({ priceData: mockPriceData });
    } finally {
      set({ loading: false });
    }
  },

  fetchPriceHistory: async (product, days = 7) => {
    try {
      const history = await fetchHistory(product, days);
      set({ priceHistory: history });
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  },
}));

export default usePriceStore;
