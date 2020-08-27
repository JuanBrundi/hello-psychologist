'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require(`bcryptjs`)

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Client.belongsToMany(models.Psychologist, {through: models.PsychologistClient})
      Client.hasMany(models.PsychologistClient)
    }
  };
  Client.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nama tidak boleh kosong"
        },
        is: {
          args: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
          msg: "Nama hanya boleh terdiri dari huruf dan angka"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email tidak boleh kosong"
        },
        isEmail: {
          args: true,
          msg: "Format email salah. e.g. juanganteng@gmail.com"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username tidak boleh kosong"
        },
        is: {
          args: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
          msg: "Username hanya boleh terdiri dari huruf dan angka"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password tidak boleh kosong"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });

  Client.beforeCreate((user, options) => {
    user.role = "client"
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
  })
  return Client;
};