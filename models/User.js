const { Schema, model } = require('mongoose');

// Define the User Schema
const userSchema = new Schema({
    // Username field
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    // Email field
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/,
    },

    // Array of thoughts (references to Thought model)
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],

    // Array of friends (references to User model)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

// Define a virtual property for friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create the User model
const User = model('User', userSchema);

module.exports = User;
