require('dotenv').config();
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize');
const {Users, Consums} = require('../../models/index.js')
const bcrypt = require('bcryptjs')
exports.getUser = async (req,res,next) => {
	const {username, password} = req.body;
	await Consums.findAll({
		where:{
			[Op.or]: [
				{username: username},
				{email: username}
			]
			
		}
	})
	.then(async data => {
		bcrypt.compare(password, data[0].password,async (err, reslt) => {

			if(err){
				res.status(400).send({message:"Password atau Username anda salah", success: false})
			}
			if(reslt){
				const accessToken = jwt.sign({id: data[0].id}, process.env.ACCESS_TOKEN,{expiresIn: '10s'});
				const refreshToken = jwt.sign({id: data[0].id}, process.env.REFRESH_TOKEN, {expiresIn: '2d'});
				await Consums.update({refreshToken: refreshToken},{where:{userId:data[0].userId}})
				res.cookie('refresh_token', refreshToken, {
					httpOnly: true,
					expires: new Date(Date.now() * process.env.EXPIRE_TOKEN)
				}).json({message:"Berhasi", success: true, refreshToken, accessToken})
			}
		});
	})
	.catch(error => {
		res.status(500).send({message: "Password atau Username anda salah",success: false})
	})
}