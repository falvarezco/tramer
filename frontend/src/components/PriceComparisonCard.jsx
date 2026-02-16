import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCOP } from '@/lib/utils';
import usePriceStore from '@/stores/usePriceStore';

function getBestPrice(stores) {
  return Math.min(...stores.map((s) => s.price));
}

function getWorstPrice(stores) {
  return Math.max(...stores.map((s) => s.price));
}

export default function PriceComparisonCard({ item }) {
  const setSelectedProduct = usePriceStore((state) => state.setSelectedProduct);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{item.product}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {item.stores.map((store, idx) => {
            const isBest = store.price === getBestPrice(item.stores);
            const isWorst = store.price === getWorstPrice(item.stores);

            return (
              <div
                key={idx}
                className={`flex justify-between items-center p-3 rounded ${
                  isBest
                    ? 'bg-green-50 border border-green-200'
                    : isWorst
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{store.store}</span>
                  {isBest && (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">
                      Mejor Precio
                    </span>
                  )}
                  {store.discount > 0 && (
                    <span className="text-xs bg-yellow-400 text-gray-800 px-2 py-1 rounded">
                      -{store.discount}%
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{formatCOP(store.price)}</div>
                  {!store.available && (
                    <span className="text-xs text-red-500">No disponible</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setSelectedProduct(item.product)}
          className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-sm"
        >
          Ver historial de precios →
        </button>
      </CardContent>
    </Card>
  );
}
