const router = require('express').Router();
const controller = require('./Signup.controller');

router.post('', controller.signup);
router.post('/checkDuplicatedUserId', controller.checkDuplicatedUserId);

module.exports = router;
