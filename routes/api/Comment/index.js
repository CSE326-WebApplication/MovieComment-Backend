const router = require('express').Router();
const controller = require('./Comment.controller');

router.post('/createComment', controller.createComment);
router.post('/searchComment', controller.searchCommentByUserUidAndMovieId);
router.post('/getCommentList', controller.getCommentList);
router.post('/getScore', controller.getScore);
router.get('/moives', controller.getMovies);

module.exports = router;
