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







// import { useState, useEffect } from "react";
// import axios from 'axios';

// function App() {
//   const [products, setProducts] = useState([]);
//   // Make sure keys match exactly what your Backend expects!
//   const [formData, setFormData] = useState({ 
//     productId: '', productName: '', productDes: '', productPrice: '', productQuantity: ''
//   });

//   const api = 'http://localhost:3000/api/products';

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const res = await axios.get(`${api}/all`); // Changed 'data' to 'res'
//     setProducts(res.data);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // You MUST pass formData here for the backend to receive it
//     const res = await axios.post(`${api}/all`, formData); 
//     setProducts([...products, res.data]); // Adds new product to list immediately
//     alert("Saved!");
//   };

//   const handleDelete = async (id) => { // Added 'id' parameter here
//     await axios.delete(`${api}/${id}`);
//     setProducts(products.filter(p => p._id !== id));
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Product Inventory</h1>
      
//       <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
//         {/* Name attributes must match the keys in formData state */}
//         <input name="productId" placeholder="ID" onChange={handleChange} value={formData.productId} required />
//         <input name="productName" placeholder="Name" onChange={handleChange} value={formData.productName} required />
//         <input name="productDes" placeholder="Description" onChange={handleChange} value={formData.productDes} required />
//         <input name="productPrice" type="number" min={0} placeholder="Price" onChange={handleChange} value={formData.productPrice} required />
//         <input name="productQuantity" type="number" min={0} placeholder="Qty" onChange={handleChange} value={formData.productQuantity} required />
//         <button type="submit">Save Product</button>
//       </form>
      
//       <hr />
//       <h2>Product List</h2>
//       <ul>
//         {products.map(p => (
//           <li key={p._id} style={{ marginBottom: '10px' }}>
//             <strong>{p.productName}</strong> - ${p.productPrice} (Qty: {p.productQuantity})
//             <button onClick={() => handleDelete(p._id)} style={{ marginLeft: '10px', color: 'red' }}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;





















