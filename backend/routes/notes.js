const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const {body, validationResult } = require('express-validator')

const Notes = require("../models/Notes");

const router = express.Router();

//GET (api/notes/fetchnotes) -- returns all teh notes of the user
router.get("/fetchnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//POST (api/notes/add) --create a new note for user
router.post("/add", fetchUser, [
    body('title', 'Title should be minimum 3 characters').isLength({min : 3}),
    body('description', 'Description should be atleast 5 characters').isLength({min : 5}),
], async (req, res) => {
  try {
    console.log("user adds note")
    let { title, description, tag } = req.body;

    const errors = validationResult(req) ;
    if (!errors.isEmpty()) {
        return res.status(400).send({errors : errors.array()});
    }

    const note = new Notes({ title, description, tag, user: req.user.id });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Some error occured" });
  }
});

module.exports = router;
