  'use strict';
  const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
      
      static associate(models) {
        Likes.belongsTo(models.Posts, {
          foreignKey: "postId",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          as: "likedPost"
        });
        // Likes.belongsTo(models.Users, {
        //   foreignKey: "userId",
        //   onDelete: "CASCADE",
        //   onUpdate: "CASCADE",
        //   as: "likedBy"
        // });
      }
    }
    Likes.init({
      postId: DataTypes.INTEGER,
      userIp: DataTypes.BIGINT,
    }, {
      sequelize,
      modelName: 'Likes',
    });
    return Likes;
  };