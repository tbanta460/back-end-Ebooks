require('dotenv').config();
const {Op, ValidationError} = require('sequelize');
const {Ebooks, Consums} = require('../../models/index.js');

exports.getAllEbooks = async (req,res) => {
	Ebooks.findAll({ order: [['updatedAt', 'DESC']]})
	.then(books => {
		res.status(200).json({
			message: "Berhasil Mengambil Semua Buku",
			data: books,
			success: true
		})
	})
	.catch(error => res.status(500).send({message:"Buku Tidak Dapat Ditemukan", success: false}))
}
exports.getBooksFromIdUser = async (req,res) => {
	const getIdUserOrBook = req.params.id
	Ebooks.findAll({where:{
			[Op.or]: [
				{iduser: getIdUserOrBook},
				{idbook: getIdUserOrBook}
			]
		}
	})
	.then(data => {
		if(data){
			res.status(200).json({
				message:"Berhasil Memuat Buku",
				data,
				success:true
			})
		}
	})
	.catch(ValidationError => res.status(500).send({message: "Terjadi Kesalahan Pada Server", success: false}))
}
exports.createEbook = async (req,res) => {
	// const getIdUser = req.params.iduser
	const {title, genres, iduser, sinopsis} = req.body;
	const getIdBook = new Date().getTime().toString();
	let toArray;
	
	if(Array.isArray(genres)){
		toArray = genres;
	}else{
		toArray = genres.split(",");
	}
	Consums.findOne({
		where:{
			userId: iduser
		}
	}).then(user => {
		const objBook = {
			title,
			cover: req.file.path,
			genres: toArray,
			idbook:getIdBook,
			sinopsis,
			iduser: user.userId,
			author: user.fullname
		}
		Ebooks.create(objBook)
		.then(data => {
			res.status(200).json({
				message: "Berhasil Membuat Buku",
				data,
				success: true
			})
		})
		.catch(ValidationError => res.status(404).send({message:"Terjadi kesalahan saat membuat buku", success: false}))
	})
	.catch(ValidationError => {
		res.status(500).send({message: "Terjadi kesalahan pada server", success: false})
	})
	
}
exports.updateBook = (req,res) => {
	const {title,cover,genres} = req.body;
	const objUpdate = {
		title,
		cover,
		genres
	}
	const getIdBook = req.query.idBook
	Ebooks.findOne({
		where:{
			idbook: getIdBook
		}
	})
	.then(data => {
		if(data){
			data.update(objUpdate)
			.then(dataUpdate => {
				res.status(200).json({
					message:"Berhasil Memperbarui Buku.",
					data: dataUpdate,
					success:true
				})
			})
			.catch(ValidationError => res.status(500).send({message:"Terjadi Kesalahan Pada Server", success: false}))
		}else {
			res.status(500).send({message:"Buku Tidak Ditemukan", success: false})
		}
	})
	.catch((ValidationError, error) => res.status(404).send({message: "Data Tidak Dapat Ditemukan", success: false}))
}
exports.deleteBook = async (req,res) => {
	const getIdBook = req.params.idbook;
	try{
		const getBook = await Ebooks.findOne({where:{idbook:getIdBook}});
		getBook.destroy();
		res.status(200).json({
			message:"Berhasil Menghapus Buku",
			success:true
		})
	}
	catch(ValidationError){
		res.status(500).send({message:"Terjadi Kesalaha PAda Server", success: false})
	}
}