const PORT = process.env.PORT || 3000;
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '0 8 * * *';

const DEFAULT_TRACKED_PRODUCTS = ['leche', 'arroz', 'aceite', 'huevos', 'pan'];
const DEALS_PRODUCTS = ['leche', 'arroz', 'aceite', 'cafe', 'azucar'];

module.exports = {
  PORT,
  CRON_SCHEDULE,
  DEFAULT_TRACKED_PRODUCTS,
  DEALS_PRODUCTS,
};
