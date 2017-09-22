const router = require('express').Router();
const controller = require('./OpenMovie.controller');

router.get('', controller.openMovie);

module.exports = router;
