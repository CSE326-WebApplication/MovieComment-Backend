const request = require('request');
const qs = require('querystring');
const User = require('../../../models/User');
const Comment = require('../../../models/Comment');


// Update or Create a movie comment searched by user uid

exports.createComment = (req, res) => {
	const userUid = req.headers['uid'];
	const body = req.body;
	const movieId = body.movieId;
	const text = body.text;

	Comment.create({ userUid, movieId, text }, err => {
		if (err) {
			res.send({
				message: "Comment Failed",
				data: null,
			});
		} else {
			res.send({
				message: "Success to Create Comment"
			});
		}
	});
}

// Get a movie comment

exports.searchCommentByUserUidAndMovieId = (req, res) => {
	const userUid = req.headers['uid'];
	const body = req.body;
	const movieId = body.movieId;

	Comment.searchByUserUidAndMovieId(userUid, movieId).then(comment => {
		res.send({
			message: "Success to search comment",
			data: comment,
		});
	});
}

exports.getCommentList = (req, res) => {
	const body = req.body;
	const movieId = body.movieId;

	Comment.searchByMovieId(movieId).then(comments => {
		res.send({
			message: "Success to get comments list",
			data: comments,
		});
	});
}
