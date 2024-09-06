import { useNavigate } from "react-router-dom";
import NavBar from "../HeaderComponent/NavBar";
import "./Home.css";
import { useEffect, useState } from "react";
import { request } from "../AxiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, addAllTask, removeTask } from "../../redux/Actions/TaskSlice";
import { addLoader, removeLoader } from "../../redux/Actions/LoadingSlice";
import { RootState } from "../../redux/store";
import Loader from "../Loader";

type FormValues = {
  title: string;
  description: string;
};
type Response = {
  status: boolean;
  response: string;
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.loader);
  const getTask = useSelector((state: RootState) =>
    state.newTask.task.filter((t) => t.task_Id !== 0)
  );
  const [getMessage, setGetMessage] = useState("");
  const { register, handleSubmit, formState,reset } = useForm<FormValues>();
  const { errors } = formState;

  useEffect(() => {
    request
      .get("task/home")
      .then((data: AxiosResponse) => {
        if (data.data.status) {
          dispatch(addAllTask(data.data.response));
        }
      })
      .catch((err: AxiosError<Response>) => {
        const errorRes = err.response?.data.response;
        setGetMessage(errorRes!);
      });
  }, [dispatch]);

  const onSubmit = (data: FormValues) => {
    dispatch(addLoader());
    request
      .post("task/create", data)
      .then((data: AxiosResponse) => {
        dispatch(removeLoader());
        if (data.data.status) {
          dispatch(addTask(data.data.response));
          setGetMessage("");
        }
      })
      .catch((err: AxiosError<Response>) => {
        dispatch(removeLoader());
        const errorRes = err.response?.data.response;
        alert(errorRes);
      });
      reset()
  };

  const onDelete = (id: number) => {
    dispatch(addLoader());
    request
      .delete(`task/deleteTask?id=${id}`)
      .then((res: AxiosResponse) => {
        dispatch(removeLoader());
        if (res.data.status) {
          dispatch(removeTask(id));
          alert(res.data.response);
        }
      })
      .catch((err: AxiosError<Response>) => {
        dispatch(removeLoader());
        const errorRes = err.response?.data.response;
        alert(errorRes);
      });
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <form className="Todoinputs" onSubmit={handleSubmit(onSubmit)}>
          {loader && <Loader />}
          <h3>TODO LIST</h3>
          <input
            type="text"
            placeholder="Enter a Task"
            {...register("title", {
              required: {
                value: true,
                message: "please enter title",
              },
            })}
          />
          <p style={{ color: "brown",marginLeft:"10%" ,marginBottom:"10px"}}>{errors.title?.message}</p>
          <input
            type="text"
            placeholder="Add a short discription"
            {...register("description", {
              required: {
                value: true,
                message: "please enter a short Discription",
              },
            })}
          />
          <p style={{ color: "brown" }}>{errors.description?.message}</p>
          <button>Add Task</button>
        </form>
        <div className="cards">
          {getTask.map((task, i) => {
            return (
              <div className="task" key={i}>
                <h3 onClick={() => console.log("go to task1")}>{task.title}</h3>
                <div className="buttons">
                  <p>
                    {task.status == "pending" && (
                      <i className="bx bx-time-five"></i>
                    )}
                  </p>
                  <p style={{ color: "green" }}>
                    {task.status == "completed" && (
                      <i className="bx bx-check"></i>
                    )}
                  </p>

                  <button onClick={() => onDelete(task.task_Id)}>delete</button>
                  <button
                    onClick={() => {
                      //dispatch(addTask(task));
                      return navigate(`/edit/${task.task_Id}`);
                    }}
                  >
                    edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p>{getMessage}</p>
      </div>
    </>
  );
};

export default Home;
