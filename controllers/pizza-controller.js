const {Pizza} = require('../models');

// api functionality goes in here - the routes will import these methods and call them
// remote control!
const pizzaController = {
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    getPizzaById({params}, res) {
        // underscore id is the way of referring to that property with mongodb, i guess?
        // i wish i was writing the database data right now so i could see what it looks like!
        Pizza.findOne({
            _id: params.id
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza with this id!'});
                return;
            } else {
                res.json(dbPizzaData);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    createPizza({body}, res) {
        // mongodb uses the methods insertOne() and insertMany() to add data to a collection
        // MONGOOSE, however, uses create(), which will sort out which one to use on its own!
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // mongoose and mongodb also have updateOne() and updateMany() methods, which do not return anything
    updatePizza({params, body}, res) {
        Pizza.findOneAndUpdate(
            {_id: params.id},
            body,
            // this means it will return the updated document, not the original
            {new: true}
        )
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza with that id!'});
            } else {
                res.json(dbPizzaData);
            }
        })
        .catch(err => res.status(400).json(err));
    },

    deletePizza({params}, res) {
        Pizza.findOneAndDelete({_id: params.id})
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({message: 'No pizza with that id!'})
            } else {
                res.json(dbPizzaData);
            }
        })
        .catch(err => res.status(500).json(err));
    }
};

module.exports = pizzaController;