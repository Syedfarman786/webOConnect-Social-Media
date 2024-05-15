'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPosts.hasOne(models.Likes, {
        foreignKey: "post_id",
        as: "user_like"
      })
    }
  }
  UserPosts.init({
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    media_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserPosts',
  });
  return UserPosts;
};