const router = require('express').Router();

// users
// friends
// thoughts
// reactions

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
// get all users
router.route('/')
.get(getUsers)
.post(createUser);

// get one user
// /api/users/:userId
router.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)

// // create a user
// // /api/users/:userId/thoughts
// router.route('/:userId/thoughts')
// .post(addFriends);

// // delete a thought
// // /api/users/:userId/thoughts/:thoughtsId
// router.route('/:userId/thoughts/:thoughtId')
// .delete(deleteUser);

module.exports = router;
