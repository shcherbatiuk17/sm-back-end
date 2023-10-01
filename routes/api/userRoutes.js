const router = require('express').Router();
const {
    // Import controller functions for user management
    fetchAllUsers,
    fetchSingleUser,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
    addFriendship,
    removeFriendship,
} = require('../../controllers/userController');

// Routes for managing users
router.route('/')
    .get(fetchAllUsers)         // GET all users
    .post(createUserProfile);    // POST to create a new user profile

router.route('/:userId')
    .get(fetchSingleUser)       // GET a single user by their _id
    .put(updateUserProfile)     // PUT to update a user profile by their _id
    .delete(deleteUserProfile);  // DELETE to remove a user profile by their _id

router.route('/:userId/friends/:friendId')
    .post(addFriendship)        // POST to add a friend to a user's profile
    .delete(removeFriendship);   // DELETE to remove a friend from a user's profile

module.exports = router;
