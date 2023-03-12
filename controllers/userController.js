const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {

    // Get all users
    getUsers(request, response) {
        User.find()
        .then((users) => response.json(users))
        .catch((error) => response.status(500).json(error));
    },

    // Get a User
    getOneUser(request, response) {
        User.findOne({_id: request.params.userId})
            // according to a stack overflow search of -__V
            // This is a version key property for a Mongoose document
            // The value of this key contains the internal document revision
            .select('-__v')
            .then((user)=>
                // standard error handling
                !user
                    // if else shorthand
                    ? response.status(404).json({message: 'There is no user with the provided ID'})
                    : response.json(user)
                    )
                    .catch((error) => response.status(500).json(error));
    },

    // Create a user
    createUser(request, response) {
        User.create(request.body) 
            .then((user) => response.json(user))
            .catch((error) =>{
                console.log(error);
                return response.status(500).json(error);
            });
    },

    // Delete a user
    deleteUser(request, response) {
        User.findOneAndDelete({_id: request.params.userId})
        .then((course) =>
            !user
            ? response.status(404).json({ message: 'Cannot delete this user, ID missing'})
            : Reaction.deleteMany({ _id: {$in: user.reactions}})
        )
        .then(() => response.json({ message: 'Users and reactions deleted'}))
        .catch((error) => response.status(500).json(error));
    },

    // Update a user
    updateUser(request, response) {
        User.findOneAndUpdate(
            { _id: request.params.userId},
            { $set: request.body},
            { runValidators: true, new:true}
        )
        .then((user) => 
            !user
            ? response.status(404).json({ message: 'Update failed, no user with this ID' })
            : response.json(user)
            )
            .catch((error) => 
            {
                console.log(error)
                response.status(500).json(error);
            })
    },

    // add friend
    addFriend(request, response) {
        User.findOneAndUpdate(
          { _id: request.params.userId },
          { $addToSet: { friends: request.params.friendId} },
          { runValidators: true, new: true }
        )
          .then((friend) =>
            !friend
              ? response.status(404).json({ message: 'No friend with this id!' })
              : response.json(friend)
          )
          .catch((error) => response.status(500).json(error));
      },

      // remove friend
      removeFriend(request, response) {
        User.findOneAndUpdate(
          { _id: request.params.userId },
          { $pull: { friends: request.params.friendId} },
          { runValidators: true, new: true }
        )
          .then((friend) =>
            !friend
              ? response.status(404).json({ message: 'No friend with this id!' })
              : response.json(friend)
          )
          .catch((error) => response.status(500).json(error));
      },
};