const router = require('express').Router();
const controller = require('./Login.controller');

router.post('', controller.login);

module.exports = router;
