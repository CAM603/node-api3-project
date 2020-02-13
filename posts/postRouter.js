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

  Posts.remove(req.post.id)
    .then(removed => {
      res.status(200).json(req.post)
    })
    .catch(err => {
      res.status(500).json({ message: 'error removing post'})
    })
});

router.put('/:id', validatePostId, (req, res) => {

  Posts.update(req.post.id, req.body)
    .then(updated => {
      Posts.getById(req.post.id)
        .then(post => {
          res.status(200).json(post)
        })
    })
    .catch(err => {
      res.status(500).json({ error: 'error updating post'})
    })
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
