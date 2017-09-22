const router = require('express').Router();
const NaverMovie = require('./NaverMovie');

router.use('/NaverMovie', NaverMovie);

module.exports = router;
