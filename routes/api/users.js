const express = require('express');
var app = express();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//Load User model

const User = require('../../models/User');

// @route GET   api/users/test
// @desc        Tests Users Route
// @access      public

app.get('/test', (req,res)=> res.json({msg: "Users Works"}));

// @route GET   api/users/register
// @desc        User Registration
// @access      public

app.post('/register', (req,res)=> {
    
    const { errors, isValid } = validateRegisterInput(req.body);
    //Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }
            else{
                const avatar = gravatar.url(req.body.email,{
                    s:'200', //Size
                    r: 'pg', //Rating
                    d: 'mm' //Default show a generic profile pic
                });
                
                const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar, 
                password: req.body.password
                });
                
                //To hash the password and save it in database
                bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
                
            }
        })
    });

// @route GET   api/users/login
// @desc        Login user / Return JWT Token
// @access      public

app.post('/login', (req,res)=> {
    const email = req.body.email;
    const password = req.body.password;
    const {errors, isValid} = validateLoginInput(req.body);
    //Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    //Find user by email
    User.findOne({email: email})
        .then(user => {
            //Check for user
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //User Matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        } //Create JWT payload
                        //Sign the token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            { expiresIn: 3600 },
                            (err, token)=>{
                            res.json({
                               success: true,
                               token: 'Bearer ' + token
                            });
                        });
                    }
                    else{
                        errors.password = 'Password Incorrect';
                        return res.status(400).json(errors);
                    }
                })
        })
});


module.exports = app;