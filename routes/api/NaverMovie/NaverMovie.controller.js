const request = require('request');
var qs = require('querystring');

exports.naverMovie = (req, res) => {
	const query = require('url').parse(req.url, true).query;
	const clientID = '47agx1W9qRZX6adK4up4';
	const clientSecret = 'lBD7cNStz0';
	const headers = {
		'X-Naver-Client-Id': clientID,
		'X-Naver-Client-Secret': clientSecret,
	};

	const url = `https://openapi.naver.com/v1/search/movie.json?query=${qs.escape(query.movieName)}`;
	const option = {
		url: url,
		headers: headers
	};

	request.get(option, function(err, result, body) {
		res.send(body);
	});
}
