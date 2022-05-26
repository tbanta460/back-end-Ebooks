
const express = require('express');
const router = express.Router();
const {loginsGetUser} = require('../controlers/index.js');

router.post('/login', loginsGetUser);

module.exports = router