'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clients.belongsTo(models.Trainers, {
        foreignKey: 'trainerId',
        as: 'trainer'
      });
    }
  }
  Clients.init({
    name: DataTypes.STRING,
    statusPaid: DataTypes.BOOLEAN,
    dayToPay: DataTypes.INTEGER,
    daysOfWeek: DataTypes.JSON,
    trainerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Trainers',
        key: 'id'
      }
    },
    trainingSheetDescription: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Clients',
  });
  return Clients;
};
