const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require ('../../tokenHandler/auth');

//User Model
const User = require('../../models/User');

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (request, response) => {
    User.findById(request.user.id)
        .select('-password')
        .then(user => response.json(user));
});


// @route POST api/auth
// @desc Authenticate user
// @access Public
router.post('/', (request, response) => {
    const { email, password } = request.body;

    // Validations
    if (!email || !password) {
        return response.status(400).json({ success: false, msg: 'Please enter all fields' })
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return response.status(400).json({ success: false, msg: 'User does not exists' });

            // Validate user password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return response.status(400).json({ success: false, msg: 'Invalid credentials' });
                    jwt.sign(
                        {id: user.id, name: user.name},
                        config.get('jwtSecret'),
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err){
                                throw err;
                            }
                            else {
                                response.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        }
                    )
                })

        })
});

module.exports = router;