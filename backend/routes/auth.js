const express = require('express');
const User = require('../models/User')
const {userValidationRules, validate } = require('../validator.js')
const bcrypt = require('bcryptjs');

const router = express.Router();

//CREATE USER (POST) /api/auth/createuser (Without login)
router.post("/createuser", userValidationRules(), validate,  
    async (req, res) => {
    const salt = await bcrypt.genSalt(10) ;
    const secPass = await bcrypt.hash(req.body.password, salt) ;

    req.body.password = secPass
    const user = User(req.body);

    user.save().then(user => res.json(user)).catch(function(err) {
        if (err) {
           return res.send({error : 'Email Already exists. Please try with a new email'});
        }
    })
})

module.exports = router ;