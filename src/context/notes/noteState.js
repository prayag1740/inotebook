import { useState } from 'react'
import NoteContext from './noteContext' ;


const NoteState = (props) => {

    const host = 'http://127.0.0.1:7789'

    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes) 

    const getAllNotes = async() => {
      let url = host + '/api/notes/fetchnotes'
      const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth_token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MGM1OWU2NGJlMTQ1YWU2NTkxYzlmIn0sImlhdCI6MTY2NzI4NjQ1Mn0.loOIJ_i2kr6LQZANwjG3WgjWDN2NJYuVwsLzZ0kAa_U'
        },
      });

      const allNotes = await response.json();
      setNotes(allNotes);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
      console.log("Adding note")

      let url = host + '/api/notes/add'
      let data = {'title' : title, 'description' : description, 'tag' : tag}

      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth_token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MGM1OWU2NGJlMTQ1YWU2NTkxYzlmIn0sImlhdCI6MTY2NzI4NjQ1Mn0.loOIJ_i2kr6LQZANwjG3WgjWDN2NJYuVwsLzZ0kAa_U'
        },
        body: JSON.stringify(data) 
      });

      const newNoteJson = await response.json();

      //client side note addition
      setNotes(notes.concat(newNoteJson))
    }

    //delete a note
    const deleteNote = (id) => {
      console.log("Deleting the note with " + id)
      let newNotes = notes.filter((note) => {return note._id !== id})
      setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, description, title, tag) => {
      console.log("Editing the note with " + id)

      //api call
      let url = host + '/api/notes/update/' + id
      let data = {'title' : title, 'description' : description, 'tag' : tag}
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth_token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MGM1OWU2NGJlMTQ1YWU2NTkxYzlmIn0sImlhdCI6MTY2NzI4NjQ1Mn0.loOIJ_i2kr6LQZANwjG3WgjWDN2NJYuVwsLzZ0kAa_U'
        },
        body: JSON.stringify(data) 
      });

      const json = await response.json();

      //client side update
      for (let index = 0; index < notes.length; index++) {
        let element = notes[index]
        if (element._id === id) {
          element.description = description ;
          element.title = title ;
          element.tag = tag ;
        }
        
      }
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState ;