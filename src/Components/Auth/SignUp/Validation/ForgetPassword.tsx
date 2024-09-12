import { AxiosError, AxiosResponse } from "axios";
import { request } from "../../../AxiosConfig";
import "./Validation.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  addLoader,
  removeLoader,
} from "../../../../redux/Actions/LoadingSlice";
import Loader from "../../../Loader";

type FormValues = {
  email: string;
};
type Response = {
  status: boolean;
  msg: string;
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.loader);
  const [errMessage, setErrMessage] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    dispatch(addLoader());
    request
      .post("user/forgetPassword", data)
      .then((data: AxiosResponse) => {
        dispatch(removeLoader());
        if (data.data.status) {
          navigate("/verification/Forget");
        }
      })
      .catch((err: AxiosError<Response>) => {
        dispatch(removeLoader());
        const errorRes = err.response?.data.msg;
        setErrMessage(errorRes!);
      });
  };

  return (
    <>
      <form className="loginform validation" onSubmit={handleSubmit(onSubmit)} data-testid="form">
        {loader && <Loader />}
        <div className="inputTag">
          <p>Please enter your email. </p>
          <input
            type="text"
            className="inputfield"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "please enter email",
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "please enter the correct format email",
              },
            })}
          />
        </div>
        <p style={{ color: "brown" }}>{errors.email?.message}</p>
        <div className="buttons">
          <button className="submitButton">Next</button>
        </div>
        <p style={{ color: "brown" }}>{errMessage}</p>
      </form>
    </>
  );
};

export default ForgetPassword;
