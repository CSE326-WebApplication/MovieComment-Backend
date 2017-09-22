const router = require('express').Router();
const NaverMovie = require('./NaverMovie');
const OpenMovie = require('./OpenMovie');

router.use('/NaverMovie', NaverMovie);
router.use('/OpenMovie', OpenMovie);

module.exports = router;
