'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Likes.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    post_like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};