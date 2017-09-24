const router = require('express').Router();
const controller = require('./Login.controller');

router.get('', controller.login);

module.exports = router;
