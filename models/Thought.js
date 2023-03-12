// mongoose object is deconstructed to use Schema without mongoose.Schema
const { Schema, model} = require('mongoose');
const userSchema = require('./User');

// the reactionSchema defines the shape for the reaction subdocument
const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
     },
     reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
     },
     username: {
        type: String,
        required: true,

     },
     createdAt: {
        type: Date,
        default: Date.now,
     },
   
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
     },
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            Required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
.virtual('reactionCount')
// Getter
.get(function () {
    return this.reactions.length;
});

// initialize the Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;