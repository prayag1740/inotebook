const express = require('express');
const User = require('../models/User')
const {userValidationRules, validate } = require('../validator.js')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')

const router = express.Router();

//CREATE USER (POST) /api/auth/createuser (Without login)
router.post("/createuser", userValidationRules(), validate,  
    async (req, res) => {
    const salt = await bcrypt.genSalt(10) ;
    const secPass = await bcrypt.hash(req.body.password, salt) ;

    req.body.password = secPass
    const user = User(req.body);

    data = {"user" : {"id" : user.id}}
    const jwtData = jwt.sign(data, process.env.JWT_SECRET)
    
    let resp = {"authToken" : jwtData}

    user.save().then(() => res.json(resp)).catch(function(err) {
        if (err) {
           return res.send({error : 'Email Already exists. Please try with a new email'});
        }
    })
})

module.exports = router ;