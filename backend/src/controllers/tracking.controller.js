const { trackedProducts } = require('../store/inMemoryStore');

async function trackProduct(req, res) {
  try {
    const { product } = req.body;

    if (!product) {
      return res.status(400).json({ error: 'Product is required' });
    }

    trackedProducts.add(product.toLowerCase());

    res.json({
      success: true,
      message: `Now tracking: ${product}`,
      totalTracked: trackedProducts.size
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to track product'
    });
  }
}

function getTracked(req, res) {
  res.json({
    success: true,
    products: Array.from(trackedProducts),
    total: trackedProducts.size
  });
}

module.exports = { trackProduct, getTracked };
