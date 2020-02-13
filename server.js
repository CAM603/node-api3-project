const express = require('express');

const cors = require("cors");

const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

const server = express();

// built in middleware
server.use(express.json());
server.use(cors());

// routes - endpoints
server.use('/api/users', logger, usersRouter);
server.use('/api/posts', logger, postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get("*", (req, res) => {
  res.status(404).end("Where are you trying to go??");
});
//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request to ${req.originalUrl} at ${new Date()}`)

  next()
}

module.exports = server;
