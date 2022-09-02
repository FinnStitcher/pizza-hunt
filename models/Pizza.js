const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
	{
		pizzaName: {
			type: String,
            required: true,
            trim: true
		},
		createdBy: {
			type: String,
            required: true,
            trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
		},
		size: {
			type: String,
			default: 'Large',
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large']
            // enum = must be one of these
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
        // this disables one of the default virtual getters
        // we arent using it, though im not entirely sure why it should be disabled, here
		id: false
	}
);

// setting up a virtual for the comment count
// this value is not stored in the database; it'll be calculated every time the pizza data is retrieved
PizzaSchema.virtual('commentCount').get(function () {
    // .reduce is used here to get a sum of all comments and replies
    // it runs on each element in the comment array, setting total to equal itself + the number of replies on this comment + 1 (for the comment itself)
    // the 0 at the end is an initialization value; that's what total should be when we start
	return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
