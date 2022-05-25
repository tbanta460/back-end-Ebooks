
const express = require('express');
const router = express.Router();
const {getUser, createUser, getAllUsers} = require('../controlers/index.js');

router.post('/my-books', require('../middleware/index.js'),(req,res) => {
	res.json({
		message:"Berhasil terverifikasi",
		data: req.user.dataValues,
		success: true
	})
});
router.get('/my-books', require('../middleware/index.js'), (req,res) => {
	res.json({
		message:"Berhasil terverifikasi",
		data: req.user.dataValues,
		success: true
	})
})
router.post('/register',  createUser);
router.get('/my-books/:userid',getUser);
router.get('/getusers', getAllUsers);

module.exports = router