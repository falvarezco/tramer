const { priceAlerts } = require('../store/inMemoryStore');

async function createAlert(req, res) {
  try {
    const { product, targetPrice, email } = req.body;

    if (!product || !targetPrice) {
      return res.status(400).json({
        error: 'Product and target price are required'
      });
    }

    const alertId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    priceAlerts.set(alertId, {
      product,
      targetPrice,
      email,
      created: new Date().toISOString(),
      triggered: false
    });

    res.json({
      success: true,
      alertId,
      message: `Price alert set for ${product} at ${targetPrice} COP`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create price alert'
    });
  }
}

module.exports = { createAlert };
