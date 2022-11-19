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
          'auth_token' : localStorage.getItem('token')
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
          'auth_token' : localStorage.getItem('token')
        },
        body: JSON.stringify(data) 
      });

      const responseStatus = response.status
      const newNoteJson = await response.json();

      if (responseStatus !== 200) {
        console.log(`Error occured while adding note with status code ${responseStatus} & err_msg => ${newNoteJson.error}`)
        return
      }

      //client side note addition
      setNotes(notes.concat(newNoteJson))
    }

    //delete a note
    const deleteNote = async (id) => {

      let url = host + '/api/notes/delete/' + id

      const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth_token' : localStorage.getItem('token')
        }, 
      });
      
      const responseStatus = response.status
      const jsonResponse = await response.json();
      
      if (responseStatus !== 200) {
        console.log(`Error occured while deleting note with status code ${responseStatus} & err_msg => ${jsonResponse.error}`)
        return
      }
  
      console.log("Deleting the note with " + id)
      let newNotes = notes.filter((note) => {return note._id !== id})
      setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title,description, tag) => {
      console.log("Editing the note with " + id)

      //api call
      let url = host + '/api/notes/update/' + id
      let data = {'title' : title, 'description' : description, 'tag' : tag}
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth_token' : localStorage.getItem('token')
        },
        body: JSON.stringify(data) 
      });

      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes)) ;

      //client side update
      for (let index = 0; index < newNotes.length; index++) {
        let element = notes[index]
        if (element._id === id) {
          newNotes[index].description = description ;
          newNotes[index].title = title ;
          newNotes[index].tag = tag ;
          break ;
        }
      }
      setNotes(newNotes) ;

    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState ;