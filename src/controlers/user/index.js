require('dotenv').config();
const bcrypt = require('bcryptjs');
const {ValidationError} = require('sequelize');
const { Op } = require('sequelize');
const {Consums} = require('../../models/index.js')
exports.getAllUsers = async (req,res) => {

	Consums.findAll()
	.then(data => {
		if(data.length === 0){
			res.status(500).send({message:"User Tidak Ditemukan", success: false})
		}
		res.status(200).json({
			message:"Berhasil Mengambil Data Users",
			data:data,
			success: true
		})
	})
	.catch(error => {
		res.status(404).send({message:"Terjadi kesalahan ketika mengambil data", sucess: false})
	})
}

exports.getUser = async (req,res,next) => {
	const user = req.params.userid;
	Consums.findAll({
		where:{
			[Op.or]:[
				{userId: user},
				{id: user}
			]
		}
	})
	.then(data => {
		if(data.length === 0){
			res.status(500).send({message:"User Tidak Ditemukan", sucess: false})
		}
		res.status(200).json({
			message:"Berhasil Mengambil Data Users",
			data:data[0],
			success: true
		})
	})
	.catch(error => {
		res.status(404).send({message:"Terjadi kesalahan ketika mengambil data", sucess: false})
	})
}

exports.createUser = async (req,res,next) => {
	
	const {username, fullname, email, password,confirmpassword,image} = req.body;
	const userId = new Date().getTime().toString();
		if(password === confirmpassword){
			const hashPassword = await bcrypt.hash(password, 10)
			const createUsers = {
				username,fullname,email,password:hashPassword,image, userId
			}

			try{
				const [user, created] = await Consums.findOrCreate({
					where:{
						[Op.or]:[
							{username:createUsers.username},
							{email: createUsers.email}
						]
					},
					defaults:createUsers
				});
				if(created){
					res.json({
						message: "Berhasil membuat akun",
						data:user.dataValues,
						success:true
					})
				}else {
					let resUser;
					if(createUsers.username === user.username){
						resUser = user.username
					}else {
						resUser = user.email
					}
					res.status(400).send({message:`${resUser} Sudah terdaftar`, success: false})
				}

			}catch(ValidationError){
				const {path, message} = ValidationError.errors[0]
				res.status(400).send({message:`${path}, ${message}`, success: false})
			}	
	}else {
		res.status(404).send({message:"Password Dan ConfirmPassword Tidak Cocok."})
	}		
}
