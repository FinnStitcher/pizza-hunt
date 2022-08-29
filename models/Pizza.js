const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema(
	{
		pizaName: {
			type: String
		},
		createdBy: {
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now
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
			virtuals: true
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
