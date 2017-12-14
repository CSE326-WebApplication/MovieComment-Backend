
// External Libraries
const request = require('request');
const qs = require('querystring');
const xml2js = require('xml2js');

// Models
const User = require('../../../models/User');
const Comment = require('../../../models/Comment');

// Config
const Config = require('../../../Config');

// Create a movie comment searched by user uid
exports.createComment = (req, res) => {
	const userUid = req.headers['uid'];
	const body = req.body;
	const movieId = body.movieId;
	const text = body.text;

	const _promise = new Promise((resolve, reject) => {
		// Request Translate API
		const translateOption = {
			url: 'https://openapi.naver.com/v1/language/translate',
			headers: {
				'Content-Type': "application/json",
				'X-Naver-Client-Id': Config.naver_client_id,
				'X-Naver-Client-Secret': Config.naver_client_secret
			},
			body: JSON.stringify({
				text: text,
				source: "ko",
				target: "en"
			}),
		};

		request.post(translateOption, (err, result, body) => {
			if (err) reject(err);
			else resolve(body);
		});
	}).then(translatedData => {
		const translatedText = JSON.parse(translatedData).message.result.translatedText
		// Request Text Emotion API
		const emotionOption = {
			url: 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
			headers: {
				'Content-Type': "application/json",
				'Ocp-Apim-Subscription-Key': Config.cognitiveTextSentimentKey,
			},
			body: JSON.stringify({
					documents: [{
			      language: "en",
			      id: "string",
			      text: translatedText,
		    }],
			}),
		};

		request.post(emotionOption, (err, result, body) => {
			console.log(body);
			const rating = Math.round(JSON.parse(body).documents[0].score*100);
			console.log(rating);

			Comment.create({ userUid, movieId, text, rating }, err => {
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
		});
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

// Get average score of movie by Movie ID
exports.getScore = (req, res) => {
	const body = req.body;
	const movieId = body.movieId;

	Comment.searchByMovieId(movieId).then(comments => {

		// Guard condition when the movie doesn't have any comments
		if (comments.length === 0) {
			res.send({
				message: "Success to get score of movie but it doesn't have any comments",
				data: {
					avgScore: null,
					commentCount: 0,
				}
			});
		}

		let sumScore = 0;
	  comments.forEach(comment => {
	    sumScore += comment.rating;
	  });

		res.send({
			message: "Success to get score of movie",
			data: {
				avgScore: sumScore / comments.length,
				commentCount: comments.length,
			},
		});
	});
}

// Get list of movies sorted by count of comment
exports.getMovies = (req, res) => {
	const limit = (req.query.limit != null) ? parseInt(req.query.limit) : null;
	const sortby = req.query.sortby;
	if (sortby == null) {
		res.send({
			message: "Empty value 'sortby' :: 'sortby' must have value 'comment' or 'rating'",
			data: null,
		});
	} else if (sortby == 'comment') {
		Comment.getMoviesSortedByCount(limit).then(movies => {
			res.send({
				message: "Success to get list of movies sorted by comments count",
				data: movies,
			});
		});
	} else if (sortby == 'rating') {
		Comment.getMoviesSortedByRating(limit).then(movies => {
			res.send({
					message: "Success to get list of movies sorted by comments rating",
					data: movies,
			});
		});
	} else {
		res.send({
			message: "Invalid value 'sortby' :: 'sortby' must have value only 'comment' or 'rating'",
			data: null,
		});
	}
}
