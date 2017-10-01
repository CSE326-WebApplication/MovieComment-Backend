const router = require('express').Router();
const controller = require('./Signin.controller');

router.post('', controller.signin);
router.get('/Check', controller.auth);

module.exports = router;
