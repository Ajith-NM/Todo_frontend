import { useNavigate } from "react-router-dom"
import "./UpdateTodo.css"
import {useSelector } from "react-redux"

import type { RootState } from "../../redux/store"
import { useState } from "react"
import { request } from "../AxiosConfig"
import { AxiosResponse } from "axios"

const UpdateTodo = () => {
  const navigate=useNavigate()
  const task=useSelector((state:RootState)=>state.newTask.task)
  const [status,setStatus]=useState<string>(task.status)

 const changeStatus=(id:number)=>{
  request.put(`task/statusUpdate/?id=${id}`,{status:status}).then((res:AxiosResponse)=>{
    if (res.data.response=== "task updated") {
      alert("status updated")
    }
    else{
      alert("failed to update status")
    }
  })
 }

  return (
    <>
    <div className="loginform">
      <div className="goback" onClick={()=>{navigate("/home")}}> <i className='bx bx-left-arrow-alt'></i></div>
      <h1 className="title">{task.title}</h1>
      <p>{task.description}</p>
      <div className="UpdateInputs">
      <select className="input" onChange={(event)=>setStatus(event?.target.value)}>
        <option selected disabled>{status}</option>
        <option value="pending">pending</option>
        <option value="completed">completed</option>
      </select>
      <button onClick={()=>changeStatus(task.task_Id)}>Save</button>
      </div>
    </div>
    </>
  )
}

export default UpdateTodo