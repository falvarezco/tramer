const { generateMockHistory } = require('../services/history.service');

async function getHistory(req, res) {
  try {
    const { product } = req.params;
    const { days = 7 } = req.query;

    const history = generateMockHistory(product, parseInt(days));

    res.json({
      success: true,
      product,
      history,
      days: parseInt(days)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch price history'
    });
  }
}

module.exports = { getHistory };
