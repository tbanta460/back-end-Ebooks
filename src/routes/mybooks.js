const express = require('express');
const router = express.Router();
const {getUser, createUser, myBooksGetUserFromId} = require('../controlers/index.js');;

module.exports = router