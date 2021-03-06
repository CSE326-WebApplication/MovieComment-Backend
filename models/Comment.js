const mongoose = require('mongoose');
const User = require('./User');

const Comment = new mongoose.Schema({
  userUid: String,
  username: String,
  movieId: String,
  text: String,
  rating: Number,
});

Comment.statics.create = function({ userUid, movieId, text, rating }, callback) {
  User.findOneByUid(userUid).then(user => {
    this.searchByUserUidAndMovieId(userUid, movieId).then(prevComment => {
      const username = user.username;
      const comment = new this({
        userUid,
        username,
        movieId,
        text,
        rating,
      });
      if (prevComment) {
        prevComment.set({
          text,
          rating,
        });
        return prevComment.save(err => callback(err));
      }
      return comment.save(err => callback(err));
    });
  });
}

Comment.statics.searchByUserUidAndMovieId = function(userUid, movieId) {
  return this.findOne({ userUid, movieId }).exec();
}

Comment.statics.searchByMovieId = function(movieId) {
  return this.find({ movieId }, { username: true, movieId: true, text: true, rating: true }).exec();
}

Comment.statics.getMoviesSortedByCount = function(limit) {
  if (limit == null) limit = 20;
  return this.aggregate([
      { "$group": { _id: "$movieId", count: { $sum: 1 } } },
      { "$sort": { count: -1 } },
      { "$limit": limit }
  ]).exec();
}

Comment.statics.getMoviesSortedByRating = function(limit) {
  if (limit == null) limit = 20;
  return this.aggregate([
    { "$group": { _id: "$movieId", rating: { $avg: "$rating" } } },
    { "$sort": { rating: -1 } },
    { "$limit": limit }
  ]).exec();
}

module.exports = mongoose.model('Comment', Comment);
