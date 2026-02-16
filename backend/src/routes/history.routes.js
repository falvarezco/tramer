const { Router } = require('express');
const { getHistory } = require('../controllers/history.controller');

const router = Router();

router.get('/history/:product', getHistory);

module.exports = router;
