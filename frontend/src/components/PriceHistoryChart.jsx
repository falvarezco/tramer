import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCOP } from '@/lib/utils';
import usePriceStore from '@/stores/usePriceStore';

export default function PriceHistoryChart() {
  const priceHistory = usePriceStore((state) => state.priceHistory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Precios - Últimos 7 días</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => formatCOP(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="exito"
              stroke="#ff6b6b"
              name="Éxito"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="carulla"
              stroke="#4ecdc4"
              name="Carulla"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="euro"
              stroke="#45b7d1"
              name="Euro"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
