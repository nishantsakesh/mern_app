import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react'


function App() {
  
  const [title, setTitle] = useState("");
  const [content , setContent] = useState("");
  const [allnotes , setAllNotes] = useState([]);
  const [editId , setEditId] = useState(null);


  const API_URL = 'http://localhost:3000/notes';
  //reading the data from the website
  useEffect(()=>{
    axios.get(API_URL)
    .then(res => setAllNotes(res.data))
  },[]);


  //reading the data from the website
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(editId){
      const res = await axios.put(`${API_URL}/${editId}`, {title , content});
      setAllNotes(allnotes.map(n=> n._id === editId? res.data : n));
      setEditId(null);
    }else{
      const res = await axios.post(API_URL, {title , content});
      setAllNotes([res.data, ...allnotes]);
    }
    setTitle("");
    setContent("");
  };


  //deleting the data from the website
  const handleDelete = async (id)=>{
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      setAllNotes(allnotes.filter(note => note._id !== id));
      
    } catch (error) {
      console.log("error deletiing the note", error);
    }    
  };


  //updating the notes in the website
  const startEdit = (note)=>{
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };







  return (
    <>
      <div>
        <h1>{editId ? "Edit Note" : "My Notes"}</h1>


        <form onSubmit={handleSubmit}>

          <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}/>
          <br />

          <textarea 
          placeholder="Enter the Content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}/> <br />

          <button type='submit'>{editId ? "Update Note" : "Add Note"}</button>

          {editId && (<button type="button" onClick={() => {setEditId(null); setTitle(''); setContent('');}}>Cancel</button>)}
          <hr/>

        </form>

          {allnotes.map(note =>(
            <div key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => startEdit(note)}>Edit</button>
              <button onClick={()=> handleDelete(note._id)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  )
}

export default App;
