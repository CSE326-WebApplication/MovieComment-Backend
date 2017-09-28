const router = require('express').Router();
const controller = require('./Signup.controller');

router.post('', controller.signup);

module.exports = router;
