const router = require('express').Router();
const controller = require('./Signup.controller');

router.post('', controller.signup);
router.post('/checkDuplicatedId', controller.checkDuplicatedId);

module.exports = router;
