require('dotenv').config();

const app = require('./app');
const cron = require('node-cron');
const { PORT, CRON_SCHEDULE } = require('./config');
const DailyPriceMonitor = require('./services/monitor.service');
const ColombianPriceAggregator = require('./services/aggregator.service');
const { trackedProducts, priceAlerts } = require('./store/inMemoryStore');

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     Colombian Supermarket Price Tracker API          ║
║                                                       ║
║     Server running on: http://localhost:${PORT}         ║
║                                                       ║
║     Endpoints:                                       ║
║     GET  /api/compare?product=leche                  ║
║     GET  /api/history/:product                       ║
║     GET  /api/tracked                                ║
║     POST /api/track                                  ║
║     POST /api/alerts                                 ║
║     GET  /api/deals                                  ║
║     GET  /api/stats                                  ║
║     GET  /api/health                                 ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

cron.schedule(CRON_SCHEDULE, async () => {
  console.log('Running scheduled price check...');

  const monitor = new DailyPriceMonitor(Array.from(trackedProducts));
  await monitor.runDailyCheck();

  const aggregator = new ColombianPriceAggregator();

  for (const [alertId, alert] of priceAlerts.entries()) {
    if (!alert.triggered) {
      const results = await aggregator.compareProductPrices(alert.product, ['exito', 'carulla']);

      Object.values(results).forEach(group => {
        group.products.forEach(p => {
          if (p.price <= alert.targetPrice) {
            console.log(`Price alert triggered for ${alert.product}!`);
            alert.triggered = true;
          }
        });
      });
    }
  }
});
