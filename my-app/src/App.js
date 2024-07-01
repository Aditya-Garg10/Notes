import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

const notescontext = createContext();
const notecontext = createContext();

function App() {
  const host = `http://localhost:5000`;
  const name = [];
  const [notes, setNote] = useState(name);
  

  const getNote = async () => {
    const response = await fetch(`https://notes-chi-liart.vercel.app/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
      localStorage.getItem('token')},
    });
    const json = await response.json();
    setNote(json);
  };

  const addNote = async (title, description, tag) => {
    //eslint-disable-next-line
    const response = await fetch(`https://notes-chi-liart.vercel.app/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
      localStorage.getItem('token')},
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setNote(notes.concat(note));
  };
  const editNote = async (id, title, description, tag) => {
    //eslint-disable-next-line
    const response = await fetch(`https://notes-chi-liart.vercel.app/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
      localStorage.getItem('token')},
      body: JSON.stringify({ title, description, tag }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes))
    //const json =  response.json();
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNote(newNotes)
      
    }
    getNote()
  };
  const deleteNote = async (id) => {
    const response = await fetch("https://notes-chi-liart.vercel.app/notes/deletenote/${id}", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
      localStorage.getItem('token')},
    });
    //eslint-disable-next-line
    const json = await response.json();

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(newNote);
  };
  //const hi= "Aditya"
  const [alert,setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <notecontext.Provider
        value={{ setNote, addNote, editNote, deleteNote, getNote,showAlert}}
      >
        <notescontext.Provider value={notes}>
          <BrowserRouter>
            <Navbar></Navbar>
            <Alert alert={alert}></Alert>
            <div className="container">
              <Routes>
                <Route index element={<Login/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/Home" element={<Home></Home>} />
                <Route exact path="/about" element={<About></About>} />
              </Routes>
            </div>
          </BrowserRouter>
        </notescontext.Provider>
      </notecontext.Provider>
    </>
  );
}

export default App;
export { notescontext };
export { notecontext };
