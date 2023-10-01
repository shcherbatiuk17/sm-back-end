const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve thoughts" });
    }
  },

  // Get a thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "No thought found with this ID" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve thought" });
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // Add the thought to the user's `thoughts` field
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create thought" });
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "No thought found with this ID" });
      }

      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "No user found with this ID" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete thought" });
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: "No thought found with this ID" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to update thought" });
    }
  },

  // Add a reaction to a thought
  async addReactionToThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: "No thought or user found with this ID" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to add reaction to thought" });
    }
  },

  // Delete a reaction from a thought
  async deleteReactionFromThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ error: "No thought found with this ID" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete reaction from thought" });
    }
  },
};
