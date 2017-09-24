const router = require('express').Router();
const controller = require('./Signup.controller');

router.get('', controller.signup);

module.exports = router;
