import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Note from "./mongo.js";

const app = express();

app.use(cors());
app.use(express.json());
 
mongoose.connect("mongodb://localhost:27017/notesDB");




//read
app.get('/notes', async (req,res)=>{
    const notes =  await Note.find();
    res.json(notes);
});

//add
app.post('/notes', async(req,res)=>{
    const newnotes = new Note(req.body);
    await newnotes.save();
    res.json(newnotes);
})

//delete
app.delete('/notes/:id', async (req,res)=>{
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({message : "Note Deleted Sucessfully"});
    } catch (error) {
        res.status(500).json({error : "failed to delete note"});
    }
});


app.put('/notes/:id' , async (req , res)=>{
    try {
        const updatenote = await Note.findByIdAndUpdate(req.params.id , req.body ,{new : true});
        res.json(updatenote);
    } catch (error) {
        res.status(500).json({error : "failed to update"});
    }
});



const port =3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});