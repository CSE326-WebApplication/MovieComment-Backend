
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
			url: `https://api.microsofttranslator.com/v2/http.svc/Translate?text=${qs.escape(text)}&from=ko&to=en`,
			headers: {
				'Ocp-Apim-Subscription-Key': Config.translateKey,
			}
		};

		request.get(translateOption, (err, result, body) => {
			if (err) reject(err);
			else resolve(body);
		});
	}).then(translated => {
		return new Promise((resolve, reject) => {
			// Parsing XML to string
			xml2js.parseString(translated, (err, res) => {
				if (err) reject(err);
				else resolve(res.string._);
			});
		});
	}).then(parsedString => {
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
			      text: parsedString,
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
