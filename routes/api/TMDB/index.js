const router = require('express').Router();
const controller = require('./TMDB.controller');

router.get('/search', controller.tmdbSearch);

module.exports = router;
