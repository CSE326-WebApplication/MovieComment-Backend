const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
  username: String,
  userId: String,
  password: String,
});

userSchema.statics.create = function({ username, userId, password }, callback) {
  const user = new this({
    username,
    userId,
    password
  });

  return user.save(err => callback(err));
}

userSchema.statics.findOneByUserId = function(userId) {
  return this.findOne({ userId }).exec();
}

userSchema.methods.verify = function(password) {
  return this.password === password;
}

module.exports = mongoose.model('User', userSchema);
