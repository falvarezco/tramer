const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const compareRoutes = require('./routes/compare.routes');
const historyRoutes = require('./routes/history.routes');
const trackingRoutes = require('./routes/tracking.routes');
const alertsRoutes = require('./routes/alerts.routes');
const dealsRoutes = require('./routes/deals.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', compareRoutes);
app.use('/api', historyRoutes);
app.use('/api', trackingRoutes);
app.use('/api', alertsRoutes);
app.use('/api', dealsRoutes);
app.use('/api', statsRoutes);

app.use(errorHandler);

module.exports = app;
