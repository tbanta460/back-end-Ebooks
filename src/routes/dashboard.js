const express = require('express');
const router = express.Router();
const {	dashboardCreateBook, 
		dashboardGetAllBooks, 
		dashboardUpdateBook, 
		dashboardGetBooksFromId, 
		dashboardDeleteBook} = require('../controlers/index.js');
router.post('/dashboard', require('../middleware/index.js'), (req,res) => {
	res.json({
		message:"Berhasil Mengambil Data",
		data: req.user.dataValues,
		succes: true
		})
});
router.get('/dashboard/getbooks', dashboardGetAllBooks);
router.get('/dashboard/getbooks/:id', dashboardGetBooksFromId);
router.put('/dashboard/update', dashboardUpdateBook);
router.post('/dashboard/book/create',dashboardCreateBook);

module.exports = router