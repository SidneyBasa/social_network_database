const { Schema, model} = require('mongoose');
const thoughtSchema = require('./Thought');
const { ObjectId } = require('mongoose').Types;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // code from stack overflow username: ramon22
            
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                   
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        // friendCount: friends.length

    }
)


// code from stack overflow username: ramon22
// regular expression function to validate email

const User = model('user', userSchema);

module.exports = User;