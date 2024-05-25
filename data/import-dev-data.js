const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Movie = require("./../Models/movieModel");
const path = require("path");
const fs = require("fs");

// connect to mongodb
mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("\nDataBase Connected ✔");
  })
  .catch((err) => {
    console.log("Error occured during connection", err);
  });

const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "movies.json"), "utf-8")
);

// delete existing movies for the movie collection
const deleteMovies = async () => {
  try{
    await Movie.deleteMany();
    console.log('movie data has been deleted');
  }
  catch(err){
    console.log('❌❌ An error occured trying to delete movies --> ' + err.message);
  }
  process.exit();
};

// import movie data to database movie collection
const importMovies = async () => {
  try{
    await Movie.create(movies);
    console.log("Movie has been created ✔");
  }
  catch(err){
    console.log('❌❌ An error occured during movie creation --> ' + err.message);
  }
  process.exit();
}

// console.log(process.argv);
 
if(process.argv[2] === '--delete'){
  deleteMovies();
}
else if(process.argv[2] === '--import') {
  importMovies();
}