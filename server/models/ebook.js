'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ebook.init({
    iduser: DataTypes.STRING,
    idbook: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    cover: DataTypes.STRING,
    excerpt: DataTypes.STRING,
    genres: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ebook',
  });
  return Ebook;
};