import React, { useEffect, useState } from "react";
import ListItem from "../components/ListItem";

export const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    console.log(data);
    setNotes(data);
  };

  return (
    <div className="note">
      <h1>Notes</h1>
      {notes.map((note) => {
        return <ListItem key={note.id} note={note} />;
      })}
    </div>
  );
};
