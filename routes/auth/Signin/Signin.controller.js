const request = require('request');
const User = require('../../../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

exports.signin = (req, res) => {
	console.log(req.body);
	const userId = req.body.userId;
	const binary = CryptoJS.AES.decrypt(req.body.password, userId);
	const password = binary.toString(CryptoJS.enc.Utf8);

	User.findOneByUserId(userId).then(user => {
		if (!user) {
			// Can't find user by userId in MongoDB
			res.send({
				message: "Signin failed :: Can't find userId",
				data: null,
			});
		} else {
			if (user.verify(password)) {
				// Signin Success
				return new Promise((resolve, reject) => {
					jwt.sign(
						{
							_id: user._id,
							username: user.username,
							userId: user.userId,
						},
						'exitsoft',
						{
							expiresIn: '1d',
						},
						(err, token) => {
							if (err) return reject(err);
							return resolve(token);
						}
					)
				}).then(token => {
					res.send({
						message: "Signin Success",
						data: user,
						token,
					});
				}).catch(err => {
					res.status(403).send({
						message: err.message,
					})
				})
			} else {
				// Input wrong password
				res.send({
					message: "Signin failed :: Wrong password",
					data: null,
				})
			}
		}
	});
}
