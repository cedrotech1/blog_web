'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate(models) {
      Users.hasMany(models.Posts, {
        foreignKey: 'userId',
        });
      Users.hasMany(models.Comments, {
        foreignKey: 'userId',
        });
      Users.hasMany(models.Replies, {
        foreignKey: 'userId',
        });
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profile: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    location: DataTypes.STRING,
    slog: DataTypes.TEXT('long'),
    about: DataTypes.TEXT('long'),
    password: DataTypes.STRING,
    role: {
      type: Sequelize.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};