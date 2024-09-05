import { useNavigate, useParams } from "react-router-dom";
import "./UpdateTodo.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useState } from "react";
import { request } from "../AxiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import Loader from "../Loader";
import { addLoader, removeLoader } from "../../redux/Actions/LoadingSlice";

type Response = {
  status: boolean;
  response: string;
};

const UpdateTodo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) =>
    state.newTask.task.filter((t) => t.task_Id == +params.id!)
  );
  const loader = useSelector((state: RootState) => state.loader.loader);
  const [status, setStatus] = useState<string>(task[0].status);
  const changeStatus = (id: number) => {
    dispatch(addLoader());
    request
      .put(`task/statusUpdate/?id=${id}`, { status: status })
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
          {" "}
          <i className="bx bx-left-arrow-alt"></i>
        </div>
        <h1 className="title">{task[0].title}</h1>
        <p>{task[0].description}</p>
        <div className="UpdateInputs">
          <select
            className="input"
            onChange={(event) => setStatus(event?.target.value)}
          >
            <option selected disabled>
              {status}
            </option>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
          <button onClick={() => changeStatus(task[0].task_Id)}>Save</button>
        </div>
      </div>
    </>
  );
};

export default UpdateTodo;
