const fs = require('fs').promises;
const ExitoCarullaClient = require('./scraper/ExitoCarullaClient');
const EuroSupermercadosClient = require('./scraper/EuroSupermercadosClient');

class ColombianPriceAggregator {
  constructor() {
    this.clients = {
      exito: new ExitoCarullaClient('exito'),
      carulla: new ExitoCarullaClient('carulla'),
      euro: new EuroSupermercadosClient()
    };
    this.results = [];
  }

  async compareProductPrices(searchTerm, stores = ['exito', 'carulla']) {
    console.log(`\n🔍 Searching for: "${searchTerm}" across ${stores.join(', ')}...\n`);

    const searchPromises = stores.map(store =>
      this.clients[store]
        .searchProducts(searchTerm, { limit: 10 })
        .catch(err => {
          console.error(`Error searching ${store}:`, err.message);
          return [];
        })
    );

    const results = await Promise.all(searchPromises);
    const allProducts = results.flat();

    const groupedProducts = this.groupSimilarProducts(allProducts);

    return groupedProducts;
  }

  groupSimilarProducts(products) {
    const grouped = {};

    products.forEach(product => {
      const volume = product.volume || 'unknown';
      const brand = product.brand.toLowerCase();
      const key = `${brand}_${volume}`;

      if (!grouped[key]) {
        grouped[key] = {
          description: `${product.brand} (${volume}ml/g)`,
          products: []
        };
      }

      grouped[key].products.push(product);
    });

    Object.values(grouped).forEach(group => {
      group.products.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));

      if (group.products.length > 1) {
        const lowestPrice = group.products[0].price;
        group.products.forEach(product => {
          product.savings = product.price - lowestPrice;
        });
      }
    });

    return grouped;
  }

  formatComparison(groupedProducts) {
    console.log('\n📊 PRICE COMPARISON RESULTS\n');
    console.log('='.repeat(80));

    Object.values(groupedProducts).forEach(group => {
      console.log(`\n📦 ${group.description}`);
      console.log('-'.repeat(40));

      group.products.forEach((product, index) => {
        const priceStr = product.price
          ? `$${product.price.toLocaleString('es-CO')}`
          : 'No disponible';

        const discountStr = product.discount > 0
          ? ` (-${product.discount}%)`
          : '';

        const savingsStr = product.savings > 0
          ? ` (+$${product.savings.toLocaleString('es-CO')} vs mejor precio)`
          : index === 0 && group.products.length > 1
          ? ' ✅ MEJOR PRECIO'
          : '';

        console.log(
          `  ${product.store.toUpperCase().padEnd(10)} | ` +
          `${priceStr}${discountStr}${savingsStr}`
        );

        if (product.pricePerUnit) {
          console.log(`  ${' '.repeat(10)} | $${product.pricePerUnit}/L o /Kg`);
        }
      });
    });

    console.log('\n' + '='.repeat(80));
  }

  async trackPriceHistory(searchTerm, stores = ['exito', 'carulla']) {
    const timestamp = new Date().toISOString();
    const results = await this.compareProductPrices(searchTerm, stores);

    const historyFile = 'price_history.json';
    let history = [];

    try {
      const existing = await fs.readFile(historyFile, 'utf8');
      history = JSON.parse(existing);
    } catch (e) {
      // File doesn't exist yet
    }

    history.push({
      timestamp,
      searchTerm,
      results
    });

    await fs.writeFile(historyFile, JSON.stringify(history, null, 2));
    console.log(`\n📈 Price history updated`);

    return results;
  }
}

module.exports = ColombianPriceAggregator;
