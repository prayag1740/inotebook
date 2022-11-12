import { useState } from 'react'
import NoteContext from './noteContext' ;

const NoteState = (props) => {

    const initialNotes = [
        {
          "_id": "6362760fc0a6be7890693f89",
          "title": "first",
          "description": "This is my first note",
          "tag": "personal",
          "user": "6360c59e64be145ae6591c9f",
          "date": "2022-11-02T13:52:15.421Z",
          "__v": 0
        },
        {
          "_id": "63627668c0a6be7890693f8c",
          "title": "second",
          "description": "This is my second note",
          "tag": "personal",
          "user": "6360c59e64be145ae6591c9f",
          "date": "2022-11-02T13:53:44.303Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(initialNotes) 

    //Add a note
    const addNote = (title, description, tag) => {
      console.log("Adding note")
      let newNote = {
        "_id": "63627668c0a6be7890693f8c123",
        "title": title,
        "description": description,
        "tag": tag,
        "user": "6360c59e64be145ae6591c9f",
        "date": "2022-11-02T13:53:44.303Z",
        "__v": 0
      }
      setNotes(notes.concat(newNote))
    }

    //delete a note
    const deleteNote = (id) => {
      console.log("Deleting the note with " + id)
      let newNotes = notes.filter((note) => {return note._id !== id})
      setNotes(newNotes)
    }

    //edit a note
    const editNote = (id) => {
      console.log("Editing the note with " + id)
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState ;