const router = require('express').Router();

const Signin = require('./Signin');
const Signup = require('./Signup');

router.use('/Signin', Signin);
router.use('/Signup', Signup);

module.exports = router;
