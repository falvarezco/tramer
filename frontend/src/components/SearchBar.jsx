import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import usePriceStore from '@/stores/usePriceStore';

export default function SearchBar() {
  const { searchTerm, loading, setSearchTerm, searchProducts } = usePriceStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchProducts(searchTerm);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar producto... (ej: leche, arroz, aceite)"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
}
