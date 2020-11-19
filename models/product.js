'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {foreignKey: "UserId"})
      Product.belongsToMany(models.User,({through:models.Cart}))
    }
  };
  Product.init({
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: "Name cannot be empty"
        }
      }
    },  
    image_url: {
      type:DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: "Image_url cannot be empty"
        }
      }
    }, 
    price: {
      type:DataTypes.DOUBLE,
      allowNull:false,
      validate:{
        notNull: {
          args: true,
          msg: 'Price cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Price must be a number value'
        },
        isMinus(value) {
          if(value < 0) {
            throw new Error ('Price cannot be less than zero')
          }
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        isNumeric: {
          args: true,
          msg: 'Stock must be a number value'
        },
        isMinus(value) {
          if(value < 0) {
            throw new Error ('Stock cannot be less than zero')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};