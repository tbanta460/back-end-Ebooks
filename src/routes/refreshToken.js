const express = require('express');
const router = express.Router();
const {refreshToken, isCookies, removeCookies} = require('../controlers/index.js');

router.post('/refresh', refreshToken);
router.get('/cookies', isCookies);
router.get('/removeCookies', removeCookies)
module.exports = router
