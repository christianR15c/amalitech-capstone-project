'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chat.belongsToMany(models.user, {
        through: 'userchat',
        foreignKey: 'chatId',
        as: 'users',
      });

      Chat.hasMany(models.Message, {
        foreignKey: 'chatId',
        as: 'messages',
      });
    }
  }
  Chat.init({
    chatName: DataTypes.STRING,
    isGroupChat: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    groupAdmin: DataTypes.INTEGER,
    chatOwner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};