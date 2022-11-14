import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

export default function AddNote() {
  const context = useContext(NoteContext);
  const {addNote } = context;

  const [note, SetNote] = useState({'title' : '', 'description' : '' , 'tag' : ''})

  const handleClick = (e) => {
    e.preventDefault(); //to prevent page from reloading ; cancels the default action
    addNote(note.title, note.description, note.tag);
    SetNote({'title' : '', 'description' : '' , 'tag' : ''}) ;
  }

  const onChange = (e) => {
      SetNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <div>
    <div className='container my-3'>
    <h2>Add a note</h2>
    <form className='my-3'>
    <div className="mb-3">
    <label className='form-label my-2' htmlFor="title">Title</label>
    <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" onChange={onChange} minLength={3} required value={note.title}  />
    </div>
    <div className="form-group">
    <label htmlFor="description" className='my-2'>Description</label>
    <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" onChange={onChange} minLength={5} required value={note.description} />
   </div>
   <div className="my-3">
    <label htmlFor="tag" className='my-2'>Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter Tag" onChange={onChange} value={note.tag} />
   </div>
  <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
  </form>
  </div>
    </div>
  )
}
