const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// replies are stored inside the documents for the comments they are left on

const ReplySchema = new Schema(
	{
		// custom id to avoid confusion w/ comment _id
		replyId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		replyBody: {
			type: String,
            required: true,
            trim: true
		},
		writtenBy: {
			type: String,
            required: true,
            trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal)
		}
	},
	{
		toJSON: {
			getters: true
		},
        id: false
	}
);

const CommentSchema = new Schema(
	{
		writtenBy: {
			type: String,
            required: true,
            trim: true
		},
		commentBody: {
			type: String,
            required: true,
            trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: createdAtVal => dateFormat(createdAtVal)
		},
		// a comment has a property called replies
		// which contains an array of objects following the pattern of ReplySchema
		// thats crazy, huh?
		replies: [ReplySchema]
	},
	{
		toJSON: {
            virtuals: true,
			getters: true
		},
        id: false
	}
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
