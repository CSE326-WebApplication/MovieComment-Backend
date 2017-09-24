const request = require('request');
var qs = require('querystring');

exports.tmdbSearch = (req, res) => {
	const query = require('url').parse(req.url, true).query;
	const key = '083f7cf05368860a32210b553f6a0a23';
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=ko&query=${qs.escape(query.movieName)}&page=1&include_adult=false`;
	request.get(url, function(err, result, body) {
		res.send(body);
	});
}
