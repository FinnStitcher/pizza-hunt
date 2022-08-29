const router = require('express').Router();
const {getAllPizza, getPizzaById, createPizza, updatePizza, deletePizza} = require('../../controllers/pizza-controller');

// /api/pizzas

// all get and post routes will go to the base route
router.route('/').get(getAllPizza).post(createPizza);

// get one, put, delete go to /api/pizzas/:id
router.route('/:id').get(getPizzaById).put(updatePizza).delete(deletePizza);

// this method abstracts database methods (in controllers) from the routes (here) lets us write unit tests

module.exports = router;