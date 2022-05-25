'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chapters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Chapters.init({
    title: DataTypes.STRING,
    paragraf: DataTypes.TEXT,
    idbook: DataTypes.STRING,
    chapid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chapters',
  });
  return Chapters;
};