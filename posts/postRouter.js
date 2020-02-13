const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {

  Posts.get()
    .then(posts => {
      res.status(500).json(posts)
    })
    .catch(err => {
      res.status(500).json({ error: 'Error getting posts'})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  res.json(req.post)
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;

  Posts.getById(id)
    .then(post => {
      if(post) {
        req.post = post;
        next()
      } else {
        res.status(400).json({ message: "invalid post id" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error getting post" })
    })
}

module.exports = router;
