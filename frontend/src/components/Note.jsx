import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container" style={{backgroundColor: "#38027f"}}>
            <h1 className="note-title" style={{color: "white"}}>{note.title}</h1>
            <p className="note-content"  style={{color: "white"}}>{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note
