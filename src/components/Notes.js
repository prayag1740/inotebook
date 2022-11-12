import NoteContext from "../context/notes/noteContext";
import React, { useContext } from "react";
import NoteItem from "../components/NoteItem";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;

  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      {notes.map((note) => {
        return <NoteItem note={note} key={note._id} />;
      })}
    </div>
  );
}
