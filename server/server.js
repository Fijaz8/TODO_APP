
import express from "express";
import db from "./config/db.js";
import cors from "cors";


const app= express();
const port= 5000;
app.use(cors());
app.use(express.json());

app.get("/todo",async(req,res)=>{
    try {
        const response = await db.query("select * from todo")
        
        res.json(response.rows);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });
    }
   

})
app.post("/topost",async(req,res)=>{
    try { 
        
        const{title,content}= req.body;
        
        const response = await db.query("INSERT INTO todo (title,content) VALUES ($1,$2) RETURNING *",[title,content]);
        console.log(response.rows)
        
        res.status(201).send({ message: "New Todo created", todo: response.rows[0] })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
})

app.delete("/todos/:id",async(req,res)=>{
    try{
        const parm= req.params.id;
        console.log(parm);
        const response = await db.query(`delete from todo where id =$1`,[parm]);
        console.log(response);
        res.status(200).json({message:"thus the deletion operation is succesfully executed."})
        
    } catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
})


app.put("/edit",async(req,res)=>{
    try {
        const {id,title,content}= req.body;
        db.query("update todo set title=$1 ,content=$2 where id=$3",[title,content,id])
        res.status(201).json({message:"edit operation is sucessfull"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
