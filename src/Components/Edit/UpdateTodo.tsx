import { useNavigate, useParams } from "react-router-dom";
import "./UpdateTodo.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { request } from "../AxiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import Loader from "../Loader";
import { addLoader, removeLoader } from "../../redux/Actions/LoadingSlice";

type Response = {
  status: boolean;
  response: string;
};
type Task = {
  task_Id: number;
  title: string;
  description: string;
  status: string;
  user_Id: number;
  createdAt: string;
  updatedAt: string;
};

const UpdateTodo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [task, setTask] = useState<Task>();
  const loader = useSelector((state: RootState) => state.loader.loader);
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    request
      .get(`task/getTask/${+params.id!}`)
      .then((data: AxiosResponse) => {
        if (data.data.status) {
          setTask(data.data.response);
          setStatus(data.data.response.status)
        }
      })
      .catch((err: AxiosError<Response>) => {
        const errorRes = err.response?.data.response;
        alert(errorRes);
      });
  }, [params.id]);

  const changeStatus = () => {
    dispatch(addLoader());
    request
      .put(`task/statusUpdate/?id=${params.id}`, { status: status })
      .then((res: AxiosResponse) => {
        dispatch(removeLoader());
        if (res.data.status) {
          navigate("/home");
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
      {loader && <Loader />}

      <div className="loginform">
        <div
          className="goback"
          onClick={() => {
            navigate("/home");
          }}
        >
          <i className="bx bx-left-arrow-alt"></i>
        </div>
        <h1 className="title">{task?.title}</h1>
        <p>{task?.description}</p>
        <div className="UpdateInputs">
          <select
            className="input"
            onChange={(event) => setStatus(event?.target.value)}
          >
            <option selected disabled>{task?.status}</option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
          <button onClick={() => changeStatus()}>Save</button>
        </div>
      </div>
    </>
  );
};

export default UpdateTodo;
