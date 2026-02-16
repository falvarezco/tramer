const ColombianPriceAggregator = require('./aggregator.service');

class DailyPriceMonitor {
  constructor(productsToTrack) {
    this.aggregator = new ColombianPriceAggregator();
    this.productsToTrack = productsToTrack;
  }

  async runDailyCheck() {
    console.log('\n🌅 Running daily price check...');
    console.log('Time:', new Date().toLocaleString('es-CO'));

    for (const product of this.productsToTrack) {
      const results = await this.aggregator.trackPriceHistory(product);
      this.aggregator.formatComparison(results);

      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n✅ Daily check complete!');
  }

  async findBestDeals() {
    const allResults = [];

    for (const product of this.productsToTrack) {
      const results = await this.aggregator.compareProductPrices(product);

      Object.values(results).forEach(group => {
        if (group.products.length > 0) {
          const bestDeal = group.products[0];
          if (bestDeal.discount > 20) {
            allResults.push({
              product: bestDeal.name,
              store: bestDeal.store,
              discount: bestDeal.discount,
              price: bestDeal.price,
              savings: bestDeal.listPrice - bestDeal.price
            });
          }
        }
      });
    }

    if (allResults.length > 0) {
      console.log('\n🔥 HOT DEALS FOUND!\n');
      allResults.forEach(deal => {
        console.log(`  📍 ${deal.store.toUpperCase()}: ${deal.product}`);
        console.log(`     ${deal.discount}% OFF - Save $${deal.savings.toLocaleString('es-CO')}\n`);
      });
    }

    return allResults;
  }
}

module.exports = DailyPriceMonitor;
