const { Router } = require('express');
const { getStats, healthCheck } = require('../controllers/stats.controller');

const router = Router();

router.get('/stats', getStats);
router.get('/health', healthCheck);

module.exports = router;
