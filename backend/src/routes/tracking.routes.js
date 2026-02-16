const { Router } = require('express');
const { trackProduct, getTracked } = require('../controllers/tracking.controller');

const router = Router();

router.post('/track', trackProduct);
router.get('/tracked', getTracked);

module.exports = router;
