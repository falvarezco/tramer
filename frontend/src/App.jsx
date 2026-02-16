import SearchBar from '@/components/SearchBar';
import StatsCards from '@/components/StatsCards';
import PriceComparisonCard from '@/components/PriceComparisonCard';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import TopDeals from '@/components/TopDeals';
import Footer from '@/components/Footer';
import usePriceStore from '@/stores/usePriceStore';

export default function App() {
  const priceData = usePriceStore((state) => state.priceData);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Comparador de Precios - Supermercados Colombianos
          </h1>
          <p className="text-gray-600">
            Compara precios en tiempo real entre Éxito, Carulla y Euro Supermercados
          </p>
        </div>

        <SearchBar />
        <StatsCards />

        {priceData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {priceData.map((item, index) => (
              <PriceComparisonCard key={index} item={item} />
            ))}
          </div>
        )}

        <PriceHistoryChart />
        <TopDeals />
        <Footer />
      </div>
    </div>
  );
}
