const ColombianPriceAggregator = require('../services/aggregator.service');
const { DEALS_PRODUCTS } = require('../config');

const aggregator = new ColombianPriceAggregator();

async function getDeals(req, res) {
  try {
    const { minDiscount = 20 } = req.query;

    const deals = [];

    for (const product of DEALS_PRODUCTS) {
      const results = await aggregator.compareProductPrices(product, ['exito', 'carulla']);

      Object.values(results).forEach(group => {
        group.products.forEach(p => {
          if (p.discount >= minDiscount) {
            deals.push({
              product: p.name,
              store: p.store,
              price: p.price,
              listPrice: p.listPrice,
              discount: p.discount,
              savings: p.listPrice - p.price,
              url: p.url
            });
          }
        });
      });
    }

    deals.sort((a, b) => b.discount - a.discount);

    res.json({
      success: true,
      deals: deals.slice(0, 20),
      totalFound: deals.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch deals'
    });
  }
}

module.exports = { getDeals };
