const router = require('express').Router();
const {addComment, removeComment, addReply, removeReply} = require('../../controllers/comment-controller');

// /api/comments

router.route('/:pizzaId').post(addComment);

router.route('/:pizzaId/:commentId').put(addReply).delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').put(removeReply);

module.exports = router;