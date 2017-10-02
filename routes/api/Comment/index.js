const router = require('express').Router();
const controller = require('./Comment.controller');

router.post('/updateComment', controller.updateComment);
router.post('/searchComment', controller.searchCommentByUserUidAndMovieId);
router.post('/getCommentList', controller.getCommentList);

module.exports = router;
