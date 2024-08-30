import { useNavigate } from "react-router-dom";
import NavBar from "../HeaderComponent/NavBar";
import "./Home.css";
import { useEffect, useState } from "react";
import { request } from "../AxiosConfig";
import { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { addTask } from "../../redux/Actions/TaskSlice";


const Home = () => {

  type Task = {
    task_Id: number,
    title: string,
    description: string,
    status: string,
    user_Id: number,
    createdAt: string,
    updatedAt: string
  }

  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [getTask, setGetTask] = useState<Task[]>([]);
  const [getMessage, setGetMessage] = useState("");

  useEffect(() => {
    request.get("task/home").then((data: AxiosResponse) => {
      if (data.data.tasks === "please create a new task") {
        setGetMessage("please create a new task")
      }
      else {
        setGetTask(() => {
          return [...data.data.tasks]
        })
      }
    }).catch((err) => {
      console.log("error on res login",err);
      
      setGetMessage("something went wrong please refresh")
    })
  }, []);

  type FormValues = {
    title: string,
    description: string
  }

  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors } = formState

  const onSubmit = (data: FormValues) => {
    request.post("task/create", data).then((data: AxiosResponse) => {

      if (data.data.response === "new task added") {
        alert("new task added")
        window.location.reload()
      }
      else {
        alert(data.data.response)
      }
    }).catch(() => alert("something went wrong"))
  }

  const onDelete = (id: number) => {

    request.delete(`task/deleteTask?id=${id}`).then((res: AxiosResponse) => {
      if (res.data.response === "task deleted") {
        alert(res.data.response)
        window.location.reload()
      } else {
        alert(res.data.response)
      }

    })
  }
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <form className="Todoinputs" onSubmit={handleSubmit(onSubmit)}>
          <h3>TODO LIST</h3>
          <input type="text" placeholder="Enter a Task" {...register("title", {
            required: {
              value: true, message: "please enter title"
            }
          })} />
          <p style={{ color: "brown" }}>{errors.title?.message}</p>
          <input type="text" placeholder="Add a short discription" {...register("description", {
            required: {
              value: true, message: "please enter a short Discription"
            }
          })} />
          <p style={{ color: "brown" }}>{errors.description?.message}</p>
          <button>Add Task</button>
        </form>
        <div className="cards">
        {
          getTask.map((task, i) => {
            return (
             
                <div className="task" key={i}>
                  <h3 onClick={() => console.log("go to task1")}>{task.title}</h3>
                  <div className="buttons">
                    <p>
                      {task.status == "pending" && <i className="bx bx-time-five"></i>}
                    </p>
                    <p style={{ color: "green" }}>{task.status == "completed" && <i className='bx bx-check'></i>}</p>


                    <button onClick={() => onDelete(task.task_Id)}>delete</button>
                    <button onClick={()=>{
                      dispatch(addTask(task))
                      return navigate("/edit")
                    }}>edit</button>
                  </div>
                </div>
              
            )
          })
        }
        </div>
        <p>{getMessage}</p>
      </div>
    </>
  );
};

export default Home;
