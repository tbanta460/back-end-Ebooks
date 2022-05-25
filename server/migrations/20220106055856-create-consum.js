'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Consums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notEmpty: {
            args: true,
            msg: "Masukkan Username Anda."
          },
          len:{
            args: [5, 15],
            msg: "Masukkan Username Anda Minimal 5 Maximal 15."
          },
          is:/^([a-zA-Z0-9]+)/
        },
        unique:{
          args: true,
          msg: "Username Sudah Terdaftar."
        }
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          notEmpty:{
            args:true,
            msg:"Masukkan Nama Anda."
          }
        },
        is:/^([a-zA-Z\s]+)*.[a-zA-Z\s]+/
      },
      email: {
        type: Sequelize.STRING,
        validate:{
          notEmpty:{
            args: true,
            msg:"Masukkan Email Anda."
          },
          isEmail:true
        },
        unique:{
          args: true,
          msg: "Email Sudah Terdaftar."
        }
      },
      password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args:true,
            msg: "Masukkan Password Anda."
          },
          len:{
            args:[5, 100],
            msg: "Masukkan Password Anda Minimal 5 Karakter."
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Consums');
  }
};