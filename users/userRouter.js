const express = require('express');

const Users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
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
  // do your magic!
  res.json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
