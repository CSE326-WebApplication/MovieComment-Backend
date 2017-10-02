const router = require('express').Router();

const Comment = require('./Comment');
const NaverMovie = require('./NaverMovie');
const OpenMovie = require('./OpenMovie');
const TMDB = require('./TMDB');


router.use('/Comment', Comment);
router.use('/NaverMovie', NaverMovie);
router.use('/OpenMovie', OpenMovie);
router.use('/TMDB', TMDB);

module.exports = router;
