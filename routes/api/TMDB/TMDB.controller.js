const request = require('request');
const qs = require('querystring');
const key = '083f7cf05368860a32210b553f6a0a23';

exports.tmdbSearch = (req, res) => {
	const query = require('url').parse(req.url, true).query;
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=ko&query=${qs.escape(query.movieName)}&page=1&include_adult=false`;
	request.get(url, (err, result, body) => {
		res.send(body);
	});
}

exports.getBoxoffice = (req, res) => {
	const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=ko&page=1`;
	request.get(url, (err, result, body) => {
		res.send(body);
	})
}
