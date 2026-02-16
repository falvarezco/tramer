const ColombianPriceAggregator = require('../services/aggregator.service');

const aggregator = new ColombianPriceAggregator();

async function comparePrices(req, res) {
  try {
    const { product, stores = 'exito,carulla' } = req.query;

    if (!product) {
      return res.status(400).json({ error: 'Product parameter is required' });
    }

    const storeList = stores.split(',');
    const results = await aggregator.compareProductPrices(product, storeList);

    const formattedResults = Object.values(results).map(group => ({
      description: group.description,
      products: group.products.map(p => ({
        store: p.store,
        name: p.name,
        brand: p.brand,
        price: p.price,
        listPrice: p.listPrice,
        discount: p.discount,
        volume: p.volume,
        pricePerUnit: p.pricePerUnit,
        available: p.available,
        savings: p.savings || 0,
        image: p.image,
        url: p.url
      }))
    }));

    res.json({
      success: true,
      searchTerm: product,
      stores: storeList,
      results: formattedResults,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in comparePrices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch price comparison',
      message: error.message
    });
  }
}

module.exports = { comparePrices };
