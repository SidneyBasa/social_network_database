const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get(getThoughts).post(createThought);

// create read update and delete a thought
// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reaction/:username')
  .post(addReaction);

router 
  .route('/:thoughtId/reaction/:reactionId')
  .delete(removeReaction);

module.exports = router;