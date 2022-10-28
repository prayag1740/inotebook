const express = require('express');
const User = require('../models/User')
const {userValidationRules, validate } = require('../validator.js')

const router = express.Router();

//CREATE USER (POST) /api/auth/ (Without login)
router.post("/", userValidationRules(), validate,  (req, res) => {
    const user = User(req.body);

    user.save().then(user => res.json(user)).catch(function(err) {
        if (err) {
           return res.send({error : 'Email Already exists. Please try with a new email'});
        }
    })
})

module.exports = router ;