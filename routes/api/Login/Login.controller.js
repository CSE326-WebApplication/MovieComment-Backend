const request = require('request');
const User = require('../../../models/user');
const CryptoJS = require("crypto-js");

exports.login = (req, res) => {
	console.log(req.body);
	const userId = req.body.userId;
	const binary = CryptoJS.AES.decrypt(req.body.password, userId);
	const password = binary.toString(CryptoJS.enc.Utf8);

	User.find({ userId: userId }, (err, users) => {
		if (password === users[0].password) {
			res.send(users[0]);
		} else {
			res.send({
				message: 'Login Fail'
			})
		}
	});
}
