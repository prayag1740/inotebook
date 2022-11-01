const express = require('express');
const User = require('../models/User')
const {userValidationRules, validate, loginUserValidationRules } = require('../validator.js')
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

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


//Login (POST) /api/auth/login 
router.post("/login", loginUserValidationRules(), validate, 
    async (req, res) => {
        let {email, password} = req.body;
        try {
            let u = await User.findOne({"email" : email}) ;
            if (!u) {
                return res.status(400).json({error : 'Please try to login with correct credentials'});
            }
            const passwordCompare = await bcrypt.compare(password, u.password) ;

            if (! passwordCompare) {
                return res.status(400).json({error : 'Please try to login with correct credentials'});
            }

            let payload = {
                "user" : {
                    "id" : u.id
                }
            }
            const authToken = jwt.sign(payload, process.env.JWT_SECRET)
            res.json({authToken})
        } catch(error) {
            console.error(error.message);
            res.status(500).send({"error" : "Some error occured"})
        }
        }
)


//Get user details by Login 
router.post("/getUser", fetchUser, async (req, res) => {
    try {
        const userBody = req.user ;
        const userId = userBody.id ;
        const user = await User.findById(userId).select('-password')
        res.json({user})        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({"error" : "Some error occured"})
    }
})

module.exports = router ;