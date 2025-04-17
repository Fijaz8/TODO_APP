import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'

import TODOLIST from './components/TODOLIST';
import Insertlist from './components/Insertlist';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Store index of the task being edited


  useEffect(()=>{
  fetchTasks()
  },[]);
  
  const fetchTasks = async()=>{
    await axios.get('http://localhost:5000/todo')
    .then(
      Response=>{
        setTasks(Response.data)
      }
    ).catch(eror=>{
      console.log(eror)
    })
  };

  async function addnote(note) {
    if (editIndex !== null) {
      // If editing, update the existing task
      try {
        await axios.put("http://localhost:5000/edit",note,{
          headers:{"Content-Type":"application/json"}
        });
        
        console.log(`habit updated`);
      } catch (error) {
        console.log(error);
      }
      

      fetchTasks();
      setEditIndex(null); // Reset edit mode
    }
    else{
    try {
      await axios.post("http://localhost:5000/topost",note,{
        headers: { "Content-Type": "application/json" }
    });
    fetchTasks();
      console.log(`new habit created  successfully`);
      
    } catch (error) {
      console.log(error);
    }
    }
  }

  async  function  deletehabit(id){
   try {
    await axios.delete( `http://localhost:5000/todos/${id}`)
    console.log(`Todo with ID ${id} deleted successfully`);
    fetchTasks();
   } catch (error) {
    console.log(error);
    
   }
  }
 
  function handleEdit(index) {
    setEditIndex(index); // Set the task to edit
  }
  

  return (
    <div className="App">
    <Insertlist onadd={addnote}
      editTask={editIndex !== null ? tasks[editIndex] : null}/>
     <TODOLIST tasks={tasks} onDelete={deletehabit} onEdit={handleEdit} />
    </div>
  );
}

export default App;