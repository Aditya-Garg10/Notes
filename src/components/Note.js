import React, { useContext, useEffect,useRef,useState } from "react";
import { notescontext } from "../App";
import { notecontext } from "../App";

import Noteitem from "./Noteitem";
import Addnote from "./addNote";
import { useNavigate } from "react-router-dom";

const Note = (props) => {
  const name = useContext(notescontext);
  const name2 = useContext(notecontext);
  const {showAlert} = name2

  const { getNote,editNote } = name2;
  let history = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')!==null){
      getNote()
      console.log(getNote)

    }
    else{
      history("/signup")
      
      showAlert(`Please Sign Up first or Login to Use iTodo`,"warning")
    }
    //eslint-disable-next-line
  },[])
  const refClose = useRef(null)
  const ref = useRef(null)
  const [note,setNote]=useState({id:"",etitle: "",edescription:"",etag:""})
  const updateNote = (currentNote) =>{
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag: currentNote.tag});
  }
  const handleClick = (current) =>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click()
    // window.location.reload()
}
const onchange = (e) =>{
    setNote({...note,[e.target.name]: e.target.value})
}
  return (
    <>
      <Addnote></Addnote>
      
      
<button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
          <div className="modal-content">
      <div className="modal-header">
      <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="container">
      <h2 className='my-3' >Add a Note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="etitle"  className="form-label">Title</label>
    <input type="text" value={note.etitle} className="form-control" id="etitle" name='etitle'  onChange={onchange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="edescription"  className="form-label">Description</label>
    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag"  className="form-label">Tag</label>
    <input type="text"  className="form-control" id="etag" name="etag" onChange={onchange}/>
  </div>
    </form>
      </div>
      </div>
      <div className="modal-footer">
      <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button disabled={note.etitle.length<=5 || note.edescription.length<=5} id="btnRefresh" type="button" reload="true" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
      </div>
      </div>
      </div>
            <div className="row my-5">
        <h3>Your Notes</h3>
        <div className="container mx-3">
        <h6>{name.length===0 && "There are no Notes to Display"}</h6>
        </div>
        {name.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note}></Noteitem>;
        })}
      </div>
    </>
  );
};

export default Note;
