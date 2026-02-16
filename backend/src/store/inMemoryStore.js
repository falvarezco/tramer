const { DEFAULT_TRACKED_PRODUCTS } = require('../config');

const trackedProducts = new Set(DEFAULT_TRACKED_PRODUCTS);
const priceAlerts = new Map();

module.exports = { trackedProducts, priceAlerts };
