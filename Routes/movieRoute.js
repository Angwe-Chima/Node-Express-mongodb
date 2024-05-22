const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createNewMovie,
  getMovieBYID,
  updateMoviePATCH,
  deleteMovieByID,
} = require("./../Controllers/moviesController");

router.route("/").get(getAllMovies).post(createNewMovie);

router
  .route("/:id")
  .get(getMovieBYID)
  .patch(updateMoviePATCH)
  .delete(deleteMovieByID);

module.exports = router;
