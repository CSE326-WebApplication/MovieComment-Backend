const request = require('request');
const User = require('../../../models/User');
const CryptoJS = require("crypto-js");

exports.signup = (req, res) => {
	const user = new User();

	const username = req.body.username;
	const userId = req.body.userId;
	const binary = CryptoJS.AES.decrypt(req.body.password, userId);
	const password = binary.toString(CryptoJS.enc.Utf8);

	user.username = username;
	user.userId = userId;
	user.password = password;

	User.findOneByUserId(userId).then(user => {
		if (!user) {
			// Available create new User
			User.create({ username, userId, password }, err => {
				if (err) {
					console.err(err);
					res.send({
						result: 500,
						message: 'Register Failed',
					});
				} else {
					res.send({
						result: 200,
						message: 'Register Success',
						user: user,
					});
				}
			});
		} else {
			// User ID is already existed
			res.send({
				message: "Signup Failed :: User ID is already existed",
				data: null,
			})
		}
	});
}

exports.checkDuplicatedUserId = (req, res) => {
	const userId = req.body.userId;
	User.findOneByUserId(userId).then(user => {
		res.send({
			isDuplicated: !!user,
		});
	});
}
