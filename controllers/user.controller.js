const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// POST : Allows a new user to be created with a username and password.
router.post('/register', (req, res) => {
    const { email, passwordhash } = req.body;
    User.create({
        email,
        passwordhash: bcrypt.hashSync(req.body.passwordhash, 13),
    })
    .then((user) => {
        let token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, { expiresIn: '1d' })
        res.send({ 
            user,
            token
        });
    })
    .catch( err => res.status(500).send({ message: "User not created", error: err })
    )
})


// POST : Allows log in with an existing user.
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then((user) => {
        if (user) {
            //  hashed-password comparison
            bcrypt.compare(req.body.passwordhash, user.passwordhash, (err, isMatch) => {
                isMatch ? generateToken(user) : res.send('Incorrect Password');
            })
            function generateToken(user) {
                let token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, { expiresIn: '1d' })
                res.send({user, token})
            }
        }
        else {
            res.send('Login failed!');
        }
    })
})

module.exports = router;