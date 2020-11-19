'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product,{foreignKey:"UserId"})
      User.hasMany(models.Banner,{foreignKey:"UserId"})
      User.belongsToMany(models.Product,({foreignKey:"UserId",through:models.Cart}))
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role:DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
        if(user.role !== 'admin' || null){
          user.role = 'customer'
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};