const express = require ('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const config = require ('config');
const jwt = require ('jsonwebtoken');

//User Model
const User = require('../../models/User');


// @route POST api/users
// @desc Register a new user
// @access Public
router.post('/', (request, response) => {
    const {name, email, password} = request.body;

    // Validations
    if(!name || !email || !password) {
        return response.status(400).json({success: false, msg: 'Please enter all fields'})
    }

    // Check for existing user
    User.findOne({email})
        .then(user => {
            if (user) {
                return response.status(400).json({success: false, msg:'User already exists'});
            }
            else {
                const newUser = new User ({
                    name,
                    email,
                    password
                });

                // Create hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        else {
                            newUser.password = hash;
                        }
                        newUser.save()
                            .then(user => {
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
                                
                            });
                    });
                })
            }
        })
});

module.exports = router;