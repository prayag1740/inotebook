import NoteContext from "../context/notes/noteContext";
import React, { useContext, useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import AddNote from "./AddNote";
import { useRef } from "react";

export default function Notes(props) {
  const context = useContext(NoteContext);
  const {notes, getAllNotes, editNote} = context;
  const [note, SetNote] = useState({'etitle' : '', 'edescription' : '' , 'etag' : 'default' , 'id' : ''})
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    getAllNotes()}, []) //for fetching the notes once

  const updateNote = (currNote) => {
    ref.current.click();
    SetNote({etitle: currNote.title, edescription : currNote.description, etag: currNote.tag, id: currNote._id}) ;
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag) ;
    refClose.current.click() ;
    props.showAlert("Updated Note", "success")
  }

  const onChange = (e) => {
      SetNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
    <AddNote />
  <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} />
  <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <form className='my-3'>
        <div className="mb-3">
        <label className='form-label my-2' htmlFor="title">Title</label>
        <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Enter title" onChange={onChange} value={note.etitle} minLength={3} required />
        </div>
        <div className="form-group">
        <label htmlFor="description" className='my-2'>Description</label>
        <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter Description" onChange={onChange} value={note.edescription} minLength={5} required />
        </div>
        <div className="my-3">
        <label htmlFor="tag" className='my-2'>Tag</label>
        <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter Tag" onChange={onChange} value={note.etag} />
        </div>
      </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
        </div>
      </div>
    </div>
  </div>
    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container">
      {notes.length === 0 && 'No notes to display'}
      </div>
      {notes.map((note) => {
        return <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} key={note._id} />;
      })}
    </div>
    </>
  );
}
