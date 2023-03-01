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
            .select('__v')
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
        Thought.create(request.body) 
            .then((thought) => response.json(thought))
            .catch((error) =>{
                console.log(error);
                return response.status(500).json(error);
            });
    },

    // Delete a thought
    deleteThought(request, response) {
        Thought.findOneAndDelete({_id: request.params.thoughtId})
        .then((course) =>
            !thought
            ? response.status(404).json({ message: 'Cannot delete this thought, ID missing'})
            : Reaction.deleteMany({ _id: {$in: thought.reactions}})
        )
        .then(() => response.json({ message: 'Thoughts and reactions deleted'}))
        .catch((error) => response.status(500).json(error));
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
            : response.status(thought)
            )
            .catch((error) => response.status(500).json(error));
    },
};