import {useState , useEffect} from 'react';
import {BrowserRouter as Router ,Route, Routes } from 'react-router-dom'
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';

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
  //fetch task
  const fetchTask = async(id) =>{
    const res = await fetch(`http://localhost:5001/tasks/${id}`)
    const data = await res.json()
    console.log(data)
    return data
  }
  //add tasks
  const addTask= async (task)=>{
    const res= await fetch("http://localhost:5001/tasks",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(task)
    })

    const data= await res.json()

    setTasks([...tasks,data])


    // const id=Math.floor(Math.random()*10000)+1
    // const newTask={id, ...task}
    // setTasks([...tasks,newTask])
  }

  //delete tasks
  const deleteTask=async(id)=>{
    await fetch(`http://localhost:5001/tasks/${id}`,{
      method:'DELETE'
    })
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  //toggle reminder
  const toggleReminder= async (id)=>{
    const taskToToggle = await fetchTask(id)
    const updateTask={...taskToToggle,
      reminder:!taskToToggle.reminder}
      
      const res=await fetch(`http://localhost:5001/tasks/${id}`,{
      method:"PUT",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updateTask)
    })

    const data= await res.json()

    setTasks(tasks.map((task)=>
    task.id===id ?{...task,reminder:
      data.reminder } :task))
  }
  return (
    <Router>
    <div className="container">
      <Header 
      onAdd={()=> 
        setShowAddTasks(!showAddTasks)}
        showAdd={showAddTasks}/>
         {showAddTasks&&<AddTask onAdd={addTask}/>}
      {tasks.length>0?(
      <Tasks tasks={tasks} 
      onDelete={deleteTask} 
      onToggle={toggleReminder}/>)
      :"No tasks"}
      <Routes>
      <Route path='/' exact render={(props)=>(
          <>
         
          </>
        )}/>
      <Route path='/about' Component={About}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
