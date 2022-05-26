require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.refreshToken = async (req,res) => {
	const token = req.body.token;
	if(!token){
		res.status(500).send({message: 'Token Tidak Ditemukan.',success: false});
	}

	jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
		if(!err){
			const {id} = user
			const accessToken = await jwt.sign({id: user.id}, process.env.ACCESS_TOKEN);
			return res.status(200).json({
					message: "Refresh Token Berhasil",
					accessToken,
					id,
					success: true
				})
		}else {
			res.status(500).send({message: "Terjadi kesalahan ketika me-refresh Token.", success: false})
		}
	})
}
exports.isCookies = async (req,res) => {
	try{
		const mycookies = req.cookies;
		if(Object.keys(mycookies).length !== 0){
			res.status(200).json({
				success: true,
				message:"Berhasil megambil token",
				data: mycookies
			})
		}else {
			res.status(500).send({success: false, message:"Cookies tidak ditemukan"})
		}
	}catch(error){
		res.send({success: false, message:"Terjadi kesalahan"})
	}
}

exports.removeCookies = async (req,res) => {
	res.clearCookie('refresh_token').end()
	
}