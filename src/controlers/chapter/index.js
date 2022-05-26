const {Op,ValidationError} = require('sequelize');
const {Ebooks, Chapters} = require('../../models/index.js');

exports.getAllChapters = async (req,res) => {
	const getIdChapOrBook = req.params.id;
	try{
		const {count, rows} = await Chapters.findAndCountAll({where:{idbook:getIdChapOrBook}});

		const findChap = await Chapters.findAll({
			where:{
				[Op.or]:[
					{idbook:getIdChapOrBook}, 
					{chapid: getIdChapOrBook}
				]
			}
		});
		res.status(200).json({
			message:"Berhasil Memuat Chapter",
			data:findChap,
			success:true,
			totalChap: count
		})

	}catch(ValidationError){
		res.status(500).send({message:"Terjadi Kesalahan Pada Server", success: false})
	}
}
exports.getChaptersById = async (req,res) => {
	const getIdBook = req.params.idbook;

	Chapters.findAll({where:{idbook:getIdBook}})
	.then(data => {
		res.status(200).json({
			message:"Berhasi; Memuat Chapters",
			data,
			success: true
		})
	})
	.catch(ValidationError => {
		res.status(500).send({
			message:"Terjadi Kesalahan Pada Server",
			success: false
		})
	})
}
exports.createChap = async (req,res) => {
	const {title, paragraf, idbook} = req.body;
	const getChapId = new Date().getTime().toString();
	const objChap = {
		title,
		paragraf,
		chapid: getChapId,
		idbook
	}
	if((title === "") || (paragraf === "")){
		res.status(404).send({message:"Gagal Membuat Chapter", success: false})
	}
	Chapters.create(objChap)
	.then(data => {
		res.status(200).json({
			message: "Berhasil Membuat Chapter",
			data,
			success:true
		})
	})
	.catch(ValidationError => {
		res.status(500).send({message:"Terjadi Kesalahan Pada Server", success:false});
	})
	
}

exports.dataChapters = async (req,res) => {
	try{
		let restDataEbooks = await Ebooks.findAll();
		let resDataChapters = await Chapters.findAll({
			limit: 20,
			where: {
				createdAt: {
					[Op.lt]: new Date(new Date() - 60 * 60 * 1000)
				}
			}
		});
		let getIdBookFromChaps = resDataChapters.map(data => {
			let {idbook, createdAt, chapid} = data;
			return {
				create: new Date(createdAt).getTime(),
				idBooks: idbook,
				idChaps: chapid
			}
		})
		
	



		let sameValueOfArray = getIdBookFromChaps.reduce((v,i) => {
			v[i.idBooks] = (v[i.idBooks]||0) + 1;
			return v
		}, {});
		
		let resultnya = getIdBookFromChaps.filter(data => sameValueOfArray[data.idBooks.toString()] > 1);
		let tmpObj = resultnya[0];
		let tmpArr = [];
		let sndArr = []
		if(resultnya.length !== 0){
			resultnya.forEach((data) => {
				if(parseInt(tmpObj.create) < parseInt(data.create)){
					tmpObj = data
				}
			});
		}
	
		getIdBookFromChaps.map((data,index) => {
			if(tmpObj !== undefined && tmpObj.idBooks === data.idBooks){
				tmpObj.create === data.create && tmpArr.push(parseInt(data.idBooks))
			}else {
				tmpArr.push(parseInt(data.idBooks))
			}
		})
		
		for(let i = 0; i < restDataEbooks.length - 1; i++){
			let {idbook} = restDataEbooks[i];
		
			if(sndArr.length === tmpArr.length){
				break;
			}else {
				tmpArr.includes(parseInt(idbook)) && sndArr.push(restDataEbooks[i])
			}
		}
		res.status(200).json({
			message: "Berhasil mengambil data",
			data:sndArr,
			success:true
		})
	}catch(ValidationError){
		res.status(404).send({
			message: "Terjadi kesalahan pada server.",
			success: false
		})
	}
}