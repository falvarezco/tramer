import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCOP } from '@/lib/utils';

const deals = [
  { product: 'Arroz Diana 5kg', store: 'Euro', discount: 35, price: 12500 },
  { product: 'Aceite Girasol 3L', store: 'Éxito', discount: 25, price: 18900 },
  { product: 'Café Sello Rojo 500g', store: 'Carulla', discount: 20, price: 14200 },
];

export default function TopDeals() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Mejores Ofertas del Día</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-orange-200"
            >
              <div className="font-medium text-gray-900">{deal.product}</div>
              <div className="text-sm text-gray-600 mt-1">{deal.store}</div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-2xl font-bold text-orange-600">
                  -{deal.discount}%
                </span>
                <span className="text-lg font-semibold">{formatCOP(deal.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
