const Movie = require("../Models/movieModel");

const handleError = (err, res) => {
  console.error(err);
  res.status(400).json({
    status: "failed",
    message: err.message || "An error occurred",
  });
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      status: "sucess",
      length: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.getMovieBYID = async (req, res) => {
  try {
    // let movie = await Movie.find({_id: req.params.id});
    let movie = await Movie.findById(req.params.id);

    if (movie) {
      res.status(200).json({
        status: "sucess",
        data: {
          movie,
        },
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: `movie ${req.params.id} not found`,
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};

exports.createNewMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: "sucess",
      data: {
        newMovie,
      },
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateMoviePATCH = async (req, res) => {
  try {
    let movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (movie) {
      res.status(200).json({
        status: "sucess",
        data: {
          movie,
        },
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: `movie ${req.params.id} not found`,
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};

exports.deleteMovieByID = async (req, res) => {
  try {
    let movie = await Movie.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (movie) {
      res.status(204).json({
        status: "sucess",
        message: `movie with id ${req.params.id} has been deleted`,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: `movie ${req.params.id} not found`,
      });
    }
  } catch (err) {
    handleError(err, res);
  }
};
