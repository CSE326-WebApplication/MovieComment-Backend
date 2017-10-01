const request = require('request');
const qs = require('querystring');
const User = require('../../../models/User');

exports.updateComment = (req, res) => {
	const uid = req.headers['uid'];
	const body = req.body;
	const comment = req.body.comment;
	User.updateMovieComment(uid, body.movieId, body.comment).then(user => {
		res.send(user);
	});
}
