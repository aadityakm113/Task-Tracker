import {useState , useEffect} from 'react';
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from './Components/AddTask';

const App=()=> {
  const [showAddTasks,setShowAddTasks] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    const getTasks = async()=>{
      const serverTasks =await fetchTasks()
      setTasks(serverTasks)
    }
    getTasks();
  },[])

  //fetch tasks
  const fetchTasks = async() =>{
    const res = await fetch("http://localhost:5001/tasks")
    const data = await res.json()
    console.log(data)
    return data
  }
  //add tasks
  const addTask=(task)=>{
    const id=Math.floor(Math.random()*10000)+1
    const newTask={id, ...task}
    setTasks([...tasks,newTask])
  }

  //delete tasks
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
