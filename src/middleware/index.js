require('dotenv').config()
const jwt = require('jsonwebtoken');
const {Consums} = require('../models/index.js')
const {Op} = require('sequelize')

module.exports = async (req,res,next) => {
	
	let token = req.headers['authorization'];
	token = token.split(' ')[1];

	await jwt.verify(token, process.env.ACCESS_TOKEN, (err,user) => {
		
		if(user){
			Consums.findAll({
				where:{
					[Op.or]:[
						{userId: user.id},
						{id: user.id}
					]
				}
			})
			.then(dataUser => {

				req.user = dataUser[0];
				next();
			})
			.catch(error => {
				res.status(404).send({message:"User Tidak Dapat Ditemukan", success: false})
			})
		} else if( err.message === 'jwt expired'){
            return res.json({
                message: "Token expired",
                success: false
            });
        } else {
            return res.status(403).json({
                err,
                message: "User not authenticated",
                success: false
            })
        }
	})
}