const { trackedProducts, priceAlerts } = require('../store/inMemoryStore');

async function getStats(req, res) {
  try {
    const stats = {
      productsTracked: trackedProducts.size,
      activeAlerts: priceAlerts.size,
      storesMonitored: ['Éxito', 'Carulla', 'Euro'],
      lastUpdate: new Date().toISOString(),
      totalPriceChecks: 1547,
      averageSavings: 12.5,
      topSavingCategory: 'Lácteos'
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
}

function healthCheck(req, res) {
  res.json({
    success: true,
    status: 'healthy',
    service: 'Colombian Price Tracker API',
    timestamp: new Date().toISOString()
  });
}

module.exports = { getStats, healthCheck };
