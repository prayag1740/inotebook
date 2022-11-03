const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const {createUserNote, validate} = require('../validator.js')


const Notes = require("../models/Notes");

const router = express.Router();

//GET (api/notes/fetchnotes) -- returns all teh notes of the user
router.get("/fetchnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//POST (api/notes/add) --create a new note for user
router.post("/add", createUserNote(), validate, fetchUser,
 async (req, res) => {
  try {
    let { title, description, tag } = req.body;
    const note = new Notes({ title, description, tag, user: req.user.id });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Some error occured" });
  }
});


//PUT (api/notes/update) --updates a note for the user
router.put("/update/:id", fetchUser,
 async (req, res) => {

    const {title, description, tag} = req.body
  
    let note = await Notes.findById(req.params.id);
    if (!note) {return res.status(404).send({'error' : 'Note not found'})}

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send({'error' : 'Not Allowed'})
    }

    const newNote = {};
    if (title) {newNote.title = title} ;
    if (description) {newNote.description = description} ;
    if (tag) {newNote.tag = tag} ;

    note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
    res.json({note}) ;

});


module.exports = router;
