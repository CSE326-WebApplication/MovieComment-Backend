const router = require('express').Router();
const controller = require('./TMDB.controller');

router.get('/search', controller.tmdbSearch);
router.get('/getBoxoffice', controller.getBoxoffice);

module.exports = router;
