const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

// GET all users

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve users', err });
        });
});


module.exports = router;