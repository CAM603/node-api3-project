const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding user'})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // const posty = req.body;
  // posty.user_id = req.user.id
  const posty = {...req.body, user_id: req.user.id}

  Posts.insert(posty)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding post"})
    })
});

router.get('/', (req, res) => {

  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: 'Error retrieving users'})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  
  res.json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving posts' })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(deleted => {
      res.status(200).json(req.user)
    })
    .catch(err => {
      res.status(500).json({ error: 'Error deleting user'})
    })
});

router.put('/:id', validateUserId, (req, res) => {
  Users.update(req.user.id, req.body)
    .then(updated => {
      Users.getById(req.user.id)
        .then(user => {
          res.status(200).json(user)
        })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating user'})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;

  Users.getById(id)
    .then(user => {
      if(user) {
        req.user = user;
        next()
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error getting user"})
    })
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if(!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  }
  next()
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if(!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  }
  next()
}

module.exports = router;
