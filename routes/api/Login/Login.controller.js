const request = require('request');
const User = require('../../../models/user');

exports.login = (req, res) => {
	const userId = req.body.userId;
	const password = req.body.password;

	console.log(password);
	User.find({ userId: userId }, (err, users) => {
		res.send({
			users: users,
			userId: userId,
			isLogin: users[0].password === password,
		});
	});
}
