import {useState} from 'react';
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";

const App=()=> {
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

  const deleteTask=(id)=>{
    setTasks(tasks.filter((task)=>task.id!==id))
  }
  return (
    <div className="container">
      <Header />
      {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask}/>:"No tasks"}
    </div>
  );
}

export default App;
