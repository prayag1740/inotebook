const express = require('express');
const User = require('../models/User')

const router = express.Router();

//CREATE USER (POST)
router.post("/", (req, res)=> {
    console.log(req);
    const user = User(req.body);
    user.save()
    res.send('Success')
})

module.exports = router ;