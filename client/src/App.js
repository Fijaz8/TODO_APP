import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios'

import TODOLIST from './components/TODOLIST';
import Insertlist from './components/Insertlist';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = "https://todo-backend-fijaz-b2cuaxfrd4dkcvga.centralindia-01.azurewebsites.net";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(()=>{
    fetchTasks();
  },[]);
  
  const fetchTasks = async ()=>{
    await axios.get(`${API}/todo`)
    .then(res => {
      setTasks(res.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  async function addnote(note) {
    if (editIndex !== null) {

      // Update existing task
      try {
        await axios.put(`${API}/edit`, note, {
          headers: { "Content-Type": "application/json" }
        });
        console.log("Task updated");
      } catch (error) {
        console.log(error);
      }

      fetchTasks();
      setEditIndex(null);
    } 
    else {

      // Create new task
      try {
        await axios.post(`${API}/topost`, note, {
          headers: { "Content-Type": "application/json" }
        });
        console.log("New task created");
        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deletehabit(id){
    try {
      await axios.delete(`${API}/todos/${id}`);
      console.log(`Deleted ID ${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }
 
  function handleEdit(index) {
    setEditIndex(index);
  }
  
  return (
    <div className="App">
      <Insertlist 
        onadd={addnote}
        editTask={editIndex !== null ? tasks[editIndex] : null}
      />
      <TODOLIST 
        tasks={tasks} 
        onDelete={deletehabit} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default App;
