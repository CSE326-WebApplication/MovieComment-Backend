const router = require('express').Router();
const NaverMovie = require('./NaverMovie');
const OpenMovie = require('./OpenMovie');
const Signup = require('./Signup');
const TMDB = require('./TMDB');

router.use('/NaverMovie', NaverMovie);
router.use('/OpenMovie', OpenMovie);
router.use('/Signup', Signup);
router.use('/TMDB', TMDB);

module.exports = router;
