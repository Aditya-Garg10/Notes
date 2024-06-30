import React,{useContext, useState} from 'react'
import { notecontext } from "../App";

const AddNote = () => {
    const name2 = useContext(notecontext);
    const { addNote } = name2;
    const [note,setNote]=useState({title: "",description:"",tag:""})
    const handleClick = () =>{
        addNote(note.title,note.description,note.tag);
        setNote({title: "",description:"",tag:""})
    }
    const onchange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container">
      <h2 className='my-3' >Add a Note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onchange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange}/>
  </div>
  <button disabled={note.title.length<=5 || note.description.length<=5} type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
      </div>
    </div>
  )
}

export default AddNote
