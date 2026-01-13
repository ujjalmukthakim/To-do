import { useEffect, useState } from 'react'
import apiClient from "./api/api"
import './App.css'
import { useForm } from "react-hook-form";


function App() {
  // const [count, setCount] = useState(0)
  const [todo ,setTodo]=useState([])

  useEffect(()=>{
  apiClient.get().then((res)=>{
    setTodo(res.data);
  })
  },[]);

  const {
    register,handleSubmit
  } = useForm()

  const Submit =(data)=>{
    apiClient.post("",data)
    window.location.reload();

  }

  return (
    <div>

      {/* this is for post the form  */}
      <div>
        <form onSubmit={handleSubmit(Submit)}>


          <label htmlFor='todo-title'>Todo Title</label>
          <input 
          id='todo-title'
          type='text'
          placeholder='Type the title . . '
          {...register("title")}
          
          />

          <label htmlFor='description'>Description</label>
          <input
          id='description'
          type='text'
          placeholder='type your description'
          {...register("description")}
          />
          <button type='submit'>submit</button>
        </form>
      </div>


  {/* this is for listing the todo list's items ~ ~ uzzal ahammed */}
   <div>
    {todo.map((item)=>(
      <div>

        <p>{item.title}</p>
        <p>{item.description}</p>
      </div>
      
    ))}
   </div>



    </div>
  )
}

export default App
