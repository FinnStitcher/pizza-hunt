const {Comment, Pizza} = require('../models');

// we'll never run a get request for just comments, they come with the pizzas

const commentController = {
    // params = pizza id
    addComment({params, body}, res) {
        // post request will include pizza id
        console.log(body);
        Comment.create(body)
        .then(({_id}) => {
            // comment.create returns data that includes an _id
            // feeding that into this findOneAndUpdate call, which links the comment to the pizza
            // returning the result of this call for the sake of error handling
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                {$push: {comments: _id}}, // adding the id of this comment to the comments array
                {new: true}
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza with that id!'});
            } else {
                res.json(dbPizzaData);
            }
        })
        .catch(err => res.json(err));
    },
    // params = comment id AND pizza id
    removeComment({params}, res) {
        Comment.findOneAndDelete({_id: params.commentId})
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({message: 'No comment with this id!'});
            } else {
                return Pizza.findOneAndUpdate(
                    {_id: params.pizzaId},
                    {$pull: {
                        comments: params.commentId
                    }},
                    {new: true}
                )
            }
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza with that id!'})
            } else {
                res.json(dbPizzaData);
            }
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;