import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
                setTitle("");
                setContent("");
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2 className="note-heading"> Your notes:</h2>
                {notes.length === 0 ? (<p className="no-notes">You currently do not have any notes. Add a few...</p>) :
                    (
                    notes.map((note) => (
                        <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))
                )}
            </div>
            <h2 className="create-note">Create a new note:</h2>
            <form onSubmit={createNote} className="form-container">
                <label htmlFor="title" style={{ color: "white", fontSize:"1.2rem" }}>Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter your title."
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content" style={{ color: "white", fontSize:"1.2rem" }}>Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    placeholder="Enter your notes."
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <button className="form-button" type="submit" value="Submit">Submit
            </button>
            </form>
        </div>
    );
}

export default Home;
