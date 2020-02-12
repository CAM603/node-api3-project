const express = require('express');

const usersRouter = require('./users/userRouter');

const server = express();

// built in middleware
server.use(express.json());

// routes - endpoints
server.use('/api/users', logger, usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} ${Date.now()}`)

  next()
}

module.exports = server;
