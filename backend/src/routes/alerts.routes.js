const { Router } = require('express');
const { createAlert } = require('../controllers/alerts.controller');

const router = Router();

router.post('/alerts', createAlert);

module.exports = router;
