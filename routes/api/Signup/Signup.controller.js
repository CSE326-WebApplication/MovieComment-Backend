const request = require('request');
const User = require('../../../models/user');
const CryptoJS = require("crypto-js");

exports.signup = (req, res) => {
	const user = new User();

	const userId = req.body.userId;
	const binary = CryptoJS.AES.decrypt(req.body.password, userId);
	const password = binary.toString(CryptoJS.enc.Utf8);

	user.username = req.body.username;
	user.userId = userId;
	user.password = password;

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
			user: user,
		});
	});
}
