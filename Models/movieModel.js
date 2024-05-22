const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name feild is required"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description feild is required"],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Duration feild is required"],
  },
  ratings: {
    type: Number,
    default: 1.0,
  },
  totalRatings: {
    type: Number,
  },
  releaseYear: {
    type: Number,
    required: [true, "Release year is required"],
  },
  releaseDate: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  genres: {
    type: [String],
    required: [true, "Genres is required"],
  },
  directors: {
    type: [String],
    required: [true, "Directors is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover Image is required"],
  },
  actors: {
    type: [String],
    required: [true, "Actors are required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
