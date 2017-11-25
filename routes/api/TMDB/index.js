const router = require('express').Router();
const controller = require('./TMDB.controller');

router.get('/search', controller.tmdbSearch);
router.get('/getBoxoffices', controller.getBoxoffices);

module.exports = router;
