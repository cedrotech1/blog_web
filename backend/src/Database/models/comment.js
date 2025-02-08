'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Posts, {
				foreignKey: "postId",
				onDelete: "CASCADE",
        onUpdate: "CASCADE",
				as: "posts"
			});
     
      Comments.hasMany(models.Replies, {
        foreignKey: 'commentId',
        });
    }
  }
  Comments.init({
    names: DataTypes.STRING,
    commentBody: DataTypes.TEXT('long'),
    postId: DataTypes.INTEGER,
    userIp: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};