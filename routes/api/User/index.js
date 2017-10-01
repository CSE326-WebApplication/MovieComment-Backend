const router = require('express').Router();
const controller = require('./User.controller');

router.post('/updateComment', controller.updateComment);

module.exports = router;
