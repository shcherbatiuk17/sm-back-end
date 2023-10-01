const { User, Thought } = require('../models');

const userController = {
    // Fetch all users
    async fetchAllUsers(req, res) {
        try {
            const users = await User.find({}, '-__v');
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Internal server error: Unable to retrieve users" });
        }
    },

    // Fetch a single user by their _id
    async fetchSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ error: 'No user was found with this ID' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Internal server error: Unable to retrieve user" });
        }
    },

    // Create a new user profile
    async createUserProfile(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: "Bad request: Invalid user data" });
        }
    },

    // Update a user profile by their _id
    async updateUserProfile(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ error: 'No user was found with this ID' });
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: "Internal server error: Unable to update user profile" });
        }
    },

    // Delete a user profile by their _id
    async deleteUserProfile(req, res) {
        try {
            const deletedUser = await User.findOneAndRemove({ _id: req.params.userId });
            if (!deletedUser) {
                return res.status(404).json({ error: 'No user was found with this ID' });
            }
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json({ message: 'User profile and associated thoughts successfully deleted' });
        } catch (error) {
            res.status(500).json({ error: "Internal server error: Unable to delete user profile" });
        }
    },

    // Add a friendship to a user
    async addFriendship(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                { $push: { friends: req.params.friendId } },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ error: 'No user was found with this ID' });
            }
            res.json({ message: 'Friendship added successfully' });
        } catch (error) {
            res.status(500).json({ error: "Internal server error: Unable to add friend" });
        }
    },

    // Remove a friendship from a user
    async removeFriendship(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ error: 'No user was found with this ID' });
            }
            res.json({ message: 'Friendship removed successfully' });
        } catch (error) {
            res.status(500).json({ error: "Internal server error: Unable to remove friend" });
        }
    },
};

module.exports = userController;
