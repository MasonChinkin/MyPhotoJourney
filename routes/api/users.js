const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Journey = require('../../models/Journey')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));
router.get("/current", passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email
    });
});

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({email: "A user has already registered with this email"});
            } else {
                const newUser = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                createLoginResponse(user, res);
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        }); 
});

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: 'This user does not exist'});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        createLoginResponse(user, res);
                        } else {
                            return res.status(400).json({password: 'Incorrect password'});
                        }
                });
        });
});

async function createLoginResponse(user, res){
    const journeyArray = await Journey.find({userId: user.id});
    const journeys = {};
    journeyArray.forEach(journey => {
        journeys[journey._id] = journey;
    });
    const payload = {id: user.id, name: user.name, journeys: journeys};
    jwt.sign(
        payload,
        keys.secretOrKey,
        {expiresIn: 3600},
        (err, token) => {
            res.json({
                success: true,
                token: 'Bearer ' + token
            });
        });
}
    

module.exports = router;