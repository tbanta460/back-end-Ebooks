const Sequelize = require('sequelize');
const db = require('../../../config/databse.js');
// const {Users} = require('../../controlers/index.js');
const { DataTypes } = Sequelize;

const Ebooks = db.define('ebooks',{
	iduser:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty:true,
		},
		unique: true
		
	},
	idbook:{
		type: DataTypes.STRING,
		unique:true
	},
	author:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty: true
		},
	},
	title:{
		type:DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty: true
		}
	},
	cover:{
		type: DataTypes.STRING,
		allowNull: false,
	},
	genres:{
		type: DataTypes.STRING,
		allowNull: false,
		get(){
			return this.getDataValue('genres').split(';')
		},
		set(val){
			this.setDataValue('genres', val.join(';'))
		}
	},
	sinopsis:{
		type: DataTypes.STRING,
		allowNull:false
	}
},{freezeTableName:true});

module.exports = Ebooks
