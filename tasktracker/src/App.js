import {useState} from 'react';
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from './Components/AddTask';

const App=()=> {
  const [showAddTasks,setShowAddTasks] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id:1,
      text:"Doctors Appointment",
      day:"Feb 5th",
      reminder:true,
    },
    {
      id:2,
      text:"Meeting at school",
      day:"Feb 6th",
      reminder:true,
    },
    {
      id:3,
      text:"Food Shopping",
      day:"Feb 5th",
      reminder:true,
    }
  ])

  const addTask=(task)=>{
    const id=Math.floor(Math.random()*10000)+1
    const newTask={id, ...task}
    setTasks([...tasks,newTask])
  }

  const deleteTask=(id)=>{
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  const toggleReminder=(id)=>{
    setTasks(tasks.map((task)=>task.id===id ?{...task,reminder:!task.reminder}:task))
  }
  return (
    <div className="container">
      <Header 
      onAdd={()=> 
        setShowAddTasks(!showAddTasks)}
        showAdd={showAddTasks}/>
        {showAddTasks&&<AddTask onAdd={addTask}/>}
      {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:"No tasks"}
    </div>
  );
}

export default App;
