const express = require('express');
const router = express.Router();
const {getUser, createUser, myBooksGetUserFromId} = require('../controlers/index.js');;

// router.get('/my-books/:iduser',myBooksGetUserFromId);
module.exports = router