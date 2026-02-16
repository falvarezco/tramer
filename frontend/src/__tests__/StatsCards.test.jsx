import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatsCards from '../components/StatsCards';

describe('StatsCards', () => {
  it('renders three stat cards', () => {
    render(<StatsCards />);
    expect(screen.getByText('Productos Rastreados')).toBeInTheDocument();
    expect(screen.getByText('Ahorro Promedio')).toBeInTheDocument();
    expect(screen.getByText('Mejor Oferta Hoy')).toBeInTheDocument();
  });

  it('displays the correct stat values', () => {
    render(<StatsCards />);
    expect(screen.getByText('127')).toBeInTheDocument();
    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('-35%')).toBeInTheDocument();
  });
});
