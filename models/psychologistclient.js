'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PsychologistClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PsychologistClient.belongsTo(models.Client)
      PsychologistClient.belongsTo(models.Psychologist)
    }
  };
  PsychologistClient.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    PsychologistId: DataTypes.INTEGER,
    ClientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PsychologistClient',
  });
  return PsychologistClient;
};