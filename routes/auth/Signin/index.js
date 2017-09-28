const router = require('express').Router();
const controller = require('./Signin.controller');

router.post('', controller.signin);

module.exports = router;
