const router = require('express').Router();
const controller = require('./NaverMovie.controller');

router.get('', controller.naverMovie);

module.exports = router;
