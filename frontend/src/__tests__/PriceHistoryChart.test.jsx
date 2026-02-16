import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PriceHistoryChart from '../components/PriceHistoryChart';

vi.mock('../stores/usePriceStore', () => ({
  default: vi.fn((selector) =>
    selector({
      priceHistory: [
        { date: '2024-12-22', exito: 3650, carulla: 3850, euro: 3550 },
        { date: '2024-12-23', exito: 3620, carulla: 3850, euro: 3520 },
      ],
    })
  ),
}));

// Recharts uses ResizeObserver internally
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

describe('PriceHistoryChart', () => {
  it('renders the chart title', () => {
    render(<PriceHistoryChart />);
    expect(screen.getByText(/historial de precios/i)).toBeInTheDocument();
  });
});
