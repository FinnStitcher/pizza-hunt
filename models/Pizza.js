const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
	{
		pizzaName: {
			type: String
		},
		createdBy: {
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
		},
		size: {
			type: String,
			default: 'Large'
		},
		toppings: [],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		]
	},
	{
		toJSON: {
			virtuals: true,
            // the getter is the use of dateFormat() for the createdAt value
            // it will run every time this data is retrieved
            getters: true
		},
		id: false
	}
);

// setting up a virtual for the comment count
// this value is not stored in the database; it'll be calculated every time the pizza data is retrieved
PizzaSchema.virtual('commentCount').get(function () {
	return this.comments.length;
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
