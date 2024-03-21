const { DataTypes } = require('sequelize')
const sequelize = require('./../../config/sequelize')
const bcrypt = require('bcrypt')
const userSchema = {
    user_id: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.STRING,
      allowNull: false
    }
 }
const User = sequelize.define("users", userSchema);
User.prototype.validatePassword = async function(password){
  const validPassword = await bcrypt.compare(password, this.passwordHash)
  return validPassword
}
module.exports = User;

