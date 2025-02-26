const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/users-model');

// POST registration
router.post('/register', (req, res) => {
    let user = req.body;

    //hash the password
    const hash = bcrypt.hashSync(user.password, 8);

    // override the plain text password with the hash
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// POST login
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'You shall not pass' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;
