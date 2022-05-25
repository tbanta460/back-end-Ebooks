require('dotenv').config();

const bcrypt = require('bcryptjs');

const {ValidationError} = require('sequelize');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const {Users, Consums} = require('../../models/index.js');

exports.getUserFromId = async (req,res) => {
	const user = req.params;
}