const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  deleteThought,
  updateThought,
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

module.exports = router;