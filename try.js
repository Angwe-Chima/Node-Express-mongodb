const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();

const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "movies.json"), "utf-8")
);

app.use(express.json());

// ////////////////////
const gatAllMovies = (req, res) => {
  res.status(200).json({
    status: "sucess",
    length: movies.length,
    data: {
      movies,
    },
  });
};

const getMovieByYear = (req, res) => {
  if (req.params.year) {
    const year = parseInt(req.params.year);
    const movieByYear = movies.filter((movie) => movie.year * 1 === year * 1);
    res.json(movieByYear);
    return;
  }
  res.status(404).json({ error: "Movie not found" });
};

const addNewMovie = (req, res) => {
  let newId = movies.length + 1;
  let newMovie = Object.assign({ id: newId }, req.body);
  movies.push(newMovie);
  res.json(movies);
};

const editmoviePUT = (req, res) => {
  let putMovieID = req.params.id;
  let movie = movies.find((mov) => mov.id === putMovieID * 1);
  let movieIdx = movies.indexOf(movie);
  movies[movieIdx] = req.body;
  res.status(200).json({
    status: "sucess",
    data: {
      movies,
    },
  });
};

const editMoviePATCH = (req, res) => {
  let movieID = req.params.id;
  let movie = movies.find((mov) => mov.id === movieID * 1);
  let movieIdx = movies.indexOf(movie);
  let newMovie = Object.assign(movie, req.body);
  movies[movieIdx] = newMovie;
  res.status(200).json({
    status: "sucess",
    data: {
      movies,
    },
  });
};

const deleteMovie = (req, res) => {
  let movieID = req.params.id;
  let movie = movies.find((mov) => mov.id === movieID * 1);
  let movieIdx = movies.indexOf(movie);

  movies.splice(movieIdx, 1);
  res.status(200).json({
    status: "sucess",
    data: {
      movies,
    },
  });
};

const movieRouter = express.Router();

movieRouter.route("/")
  .get(gatAllMovies)
  .post(addNewMovie);

movieRouter.route("/:year")
  .get(getMovieByYear);

movieRouter.route("/:id")
  .put(editmoviePUT)
  .patch(editMoviePATCH)
  .delete(deleteMovie);

app.use('/movies', movieRouter)

app.listen(500, () => {
  console.log("Server is running...");
});
