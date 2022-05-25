const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../../config/databse.js');

const Chapters = db.define('chapters',{
	title:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty: true
		}
	},
	paragraf:{
		type: DataTypes.TEXT,
		allowNull: false,
		validate:{
			notEmpty: true
		}
	},
	idbook:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty: true
		}
	},
	chapid:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty: true
		}
	}
},{freezeTableName: true});

module.exports = Chapters