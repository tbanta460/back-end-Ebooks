const Sequelize = require('sequelize');
const db = require('../../../config/databse.js');
const { DataTypes } = Sequelize;

const Consums = db.define('consums',{
	username:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty:{args:true, msg:"Tidak boleh kosong"},
			is:/^([a-zA-Z0-9]+)/,
			len:{
				args: [5,15],
				msg: "Tolong masukkan minimal karakter 5 maximal 15"
			}
		},
		unique: true
		
	},
	fullname:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty:{args:true, msg:"Tidak boleh kosong"},
			is:/^([a-zA-Z\s]+)*.[a-zA-Z\s]+/,
		}
	},
	email:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			isEmail: {args:true, msg:"Kolom harus berisi email"},
			notEmpty:{args:true, msg:"Tidak boleh kosong"},
			is:/^[a-zA-Z][\w]+@[a-z]+(\.)[a-z]{2,3}|^[a-zA-Z]\w+[^\W]/
		},
		uique:true
	},
	password:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty:{args:true, msg:"Tidak boleh kosong"},
			len:{
				args: [5, 500],
				msg: "Tolong masukkan minimal karakter 5"
			}
		}
	},
	userId:{
		type: DataTypes.STRING,
		unique:true
	},
	refreshToken:{
		type: DataTypes.STRING
	}
},{freezeTableName:true});

module.exports = Consums
