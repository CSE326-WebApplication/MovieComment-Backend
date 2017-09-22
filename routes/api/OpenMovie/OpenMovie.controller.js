const request = require('request');

exports.openMovie = (req, res) => {
	const query = require('url').parse(req.url, true).query;
	const key = '5281b2b7c2077e72f60db74d3773b6c0';
	const targetDate = '20170921';
	const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDate}`;

	request.get(url, function(err, result, body) {
		res.send(body);
	});
}
