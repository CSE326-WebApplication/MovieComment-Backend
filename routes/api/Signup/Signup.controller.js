const request = require('request');
const User = require('../../../models/user');

exports.signup = (req, res) => {
	const user = new User();
	console.log(req.body);
	user.username = req.body.username;
	user.userId = req.body.userId;
	user.password = req.body.password;

	user.save(function(err) {
		if (err) {
			console.err(err);
			res.json({
				result: 500,
				message: 'Register Failed',
			});
		}
		res.json({
			result: 200,
			message: 'Register Success',
		});
	});
}
