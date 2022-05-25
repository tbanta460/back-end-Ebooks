const Sequelize = require('sequelize');
const db = require('../../../config/databse.js');
// const {Users} = require('../../controlers/index.js');
const { DataTypes } = Sequelize;


const User = db.define("user", {
	username:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty:true,
			is:/^([a-zA-Z0-9]+)/,
			len:{
				args: [5,15],
				msg: "Tolong masukkan minimal karakter 5 maximal 15"
			}
		},
		
	},
	fullname:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty: true,
			is:/^([a-zA-Z\s]+)*.[a-zA-Z\s]+/,
		}
	},
	email:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			isEmail: true,
			notEmpty: true,
			is:/^[a-zA-Z][\w]+@[a-z]+(\.)[a-z]{2,3}|^[a-zA-Z]\w+[^\W]/
		}
	},
	password:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty: true,
			min: 5
		}
	},
	confirmpassword:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			notEmpty:true,
			min: 5
		}
	},
	image:{
		type: DataTypes.STRING
	},
	userId:{
		type: DataTypes.STRING,
		unique:true
	}
},{
	FreezeTableName: true,
	up:(queryInterface, Sequelize) => {
		return queryInterface.addColumn('user', 'refreshToken', Sequelize.STRING);
	}
})
	
module.exports = User