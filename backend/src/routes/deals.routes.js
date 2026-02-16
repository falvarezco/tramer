const { Router } = require('express');
const { getDeals } = require('../controllers/deals.controller');

const router = Router();

router.get('/deals', getDeals);

module.exports = router;
