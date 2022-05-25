const express = require('express');
const router = express.Router();
const {chapterCreateChap, chapterGetAllChaps, chapterGetChapsById, dataChapters} = require('../controlers/index.js');

router.get('/chapter/:id', chapterGetAllChaps);
router.get('/chap/:idbook', chapterGetChapsById);
router.get('/chaps', dataChapters)
router.post('/chapter/create', chapterCreateChap);

module.exports = router