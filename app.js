const express = require("express");
const app = express();
const morgan = require('morgan')
const movieRouter = require('./Routes/movieRoute')

// Global Middleware (applied to all routes)
app.use(express.json());
app.use(express.static('./public'))

if(process.env.NODE_ENV === 'developement'){
  app.use(morgan('dev'))
}

// custom middleware  
const logger = (req, res, next)=>{
  console.log('Custom middleware called');
  next()
}

app.use(logger);

// Route-Specific Middleware (applied only to movie routes)
app.use('/api/v1/movies', movieRouter)

// using middleware
app.use((req, res, next)=>{
  req.requestedAt = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  next();
})

module.exports = app;