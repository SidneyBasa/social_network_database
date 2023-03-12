const { Thought, User } = require('../models');

module.exports = {

    // Get all thoughts
    getThoughts(request, response) {
        Thought.find()
        .then((thoughts) => response.json(thoughts))
        .catch((error) => response.status(500).json(error));
    },

    // Get a thought
    getOneThought(request, response) {
        Thought.findOne({_id: request.params.thoughtId})
            // according to a stack overflow search of -__V
            // This is a version key property for a Mongoose document
            // The value of this key contains the internal document revision
            // .select('__v')
            .then((thought)=>
                // standard error handling
                !thought
                    // if else shorthand
                    ? response.status(404).json({message: 'There is no thought with the provided ID'})
                    : response.json(thought)
                    )
                    .catch((error) => response.status(500).json(error));
    },

    // Create a thought
    createThought(request, response) {
        console.log("You are creating a thought")
        Thought.create(request.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { username: request.body.username },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? response.status(404).json({
                
                  message:'Thought created, but found no user with that ID',
                })
              : response.json('Thought created 🎉')
          )
          .catch((error) => {
            console.log(error);
            response.status(500).json(error);
          });
      },

    // Update a thought
    updateThought(request, response) {
        Thought.findOneAndUpdate(
            { _id: request.params.thoughtId},
            { $set: request.body},
            { runValidators: true, new:true}
        )
        .then((thought) => 
            !thought
            ? response.status(404).json({ message: 'Update failed, no thought with this ID' })
            : response.json(thought)
            )
            .catch((error) => response.status(500).json(error));
    },

        // Delete a thought
        deleteThought(request, response) {
        Thought.findOneAndRemove({ _id: request.params.thoughtId })
          .then((thought) =>
            !thought
              ? response.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { thoughts: request.params.thoughtId },
                  { $pull: { thoughts: request.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? response.status(404).json({
                  message: 'Thought deleted but no user with this id!',
                })
              : response.json({ message: 'Thought successfully deleted!' })
          )
          .catch((error) => response.status(500).json(error));
      },
};