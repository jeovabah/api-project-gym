'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      Trainers.hasMany(models.Clients, {
        foreignKey: 'trainerId',
        as: 'clients'
      });
    }
  }
  Trainers.init({
    name: DataTypes.STRING,
    specialty: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trainers',
  });
  return Trainers;
};
