const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const User = new mongoose.Schema({
  username: String,
  userId: String,
  password: String,
  comments: Object,
});

User.statics.create = function({ username, userId, password }, callback) {
  const user = new this({
    username,
    userId,
    password
  });

  return user.save(err => callback(err));
}

User.statics.findOneByUserId = function(userId) {
  return this.findOne({ userId }).exec();
}

User.statics.findOneByUid = function(uid) {
  return this.findOne({ _id: uid }).exec();
}

User.statics.updateMovieComment = function(uid, movieId, comment) {
  return this.findOneAndUpdate({ "comments.movieId": movieId },
    {
      $push: {
        comments: {
          movieId: movieId,
          comment: comment
        }
      }
    },
    {
      upsert: true,
    }
  ).lean().exec();
}

User.methods.verify = function(password) {
  return this.password === password;
}

module.exports = mongoose.model('User', User);
