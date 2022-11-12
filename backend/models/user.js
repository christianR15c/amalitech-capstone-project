'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsToMany(models.Chat, {
        through: 'Userchat',
        foreignKey: 'userId',
        as: 'chats',
      });

      user.hasMany(models.Message, {
        foreignKey: 'userId',
        as: 'messages',
      });
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your name',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your email',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your password',
        },
      },
      pic: {
        type: DataTypes.STRING,
        defaultValue:
          'https://res.cloudinary.com/dmgfxu4fg/image/upload/v1654073043/profile-icon_prev_ui_d7vthy.png',
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
