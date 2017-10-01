const router = require('express').Router();

const NaverMovie = require('./NaverMovie');
const OpenMovie = require('./OpenMovie');
const TMDB = require('./TMDB');
const User = require('./User');


router.use('/NaverMovie', NaverMovie);
router.use('/OpenMovie', OpenMovie);
router.use('/TMDB', TMDB);
router.use('/User', User);

module.exports = router;
