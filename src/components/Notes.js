import NoteContext from "../context/notes/noteContext";
import React, { useContext } from "react";
import NoteItem from "../components/NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  const context = useContext(NoteContext);
  const {notes} = context;

  return (
    <>
    <AddNote />
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem note={note} key={note._id} />;
      })}
    </div>
    </>
  );
}
