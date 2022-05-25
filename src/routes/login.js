
const express = require('express');
const router = express.Router();
const {loginsGetUser} = require('../controlers/index.js');
const { body } = require('express-validator');
const middleWare = require('../middleware/index.js')

router.post('/login', loginsGetUser);

module.exports = router