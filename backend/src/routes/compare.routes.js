const { Router } = require('express');
const { comparePrices } = require('../controllers/compare.controller');

const router = Router();

router.get('/compare', comparePrices);

module.exports = router;
