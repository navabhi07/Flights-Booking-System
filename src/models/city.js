'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Airport, {
        foreignKey: 'cityId',
        onDelete:'CASCADE'
      })
    }
  }
  City.init({
    name: {
     type: DataTypes.STRING,
     allowNull:false,
     unique:true
    }

  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};

// added a new city model using the following commands:
// ```
// npx sequelize model:generate --name City --attributes name:string
// npx sequelize db:migrate
// ```