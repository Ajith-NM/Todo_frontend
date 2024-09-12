import { useNavigate } from "react-router-dom";
import "./Validation.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError, AxiosResponse } from "axios";
import { request } from "../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  addLoader,
  removeLoader,
} from "../../../../redux/Actions/LoadingSlice";
import Loader from "../../../Loader";

type FormValues = {
  password: string[];
};
type Response = {
  status: boolean;
  msg: string;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.loader);
  const [errMessage, setErrMessage] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    if (data.password[0] === data.password[1]) {
      dispatch(addLoader());
      request
        .put("user/resetPassword", { password: data.password[0] })
        .then((data: AxiosResponse) => {
          dispatch(removeLoader());
          if (data.data.status) {
            navigate("/");
          } else {
            setErrMessage("failed to reset password");
          }
        })
        .catch((err: AxiosError<Response>) => {
          dispatch(removeLoader());
          const errorRes = err.response?.data.msg;
          setErrMessage(errorRes!);
        });
    } else {
      setErrMessage("please enter same password");
    }
  };

  return (
    <>
      <form className="loginform validation" onSubmit={handleSubmit(onSubmit)} data-testid="form">
        {loader && <Loader />}
        <div className="inputTag">
          <p>Add a strong password. </p>
          <input
            type="text"
            className="inputfield resetPassword"
            placeholder="New Password"
            {...register("password.0", {
              required: {
                value: true,
                message: "please enter password",
              },
              minLength: {
                value: 6,
                message: "password contain atleast 6 characters",
              },
            })}
          />
          <p style={{ color: "brown", fontSize: "16px" }}>
            {errors.password?.[0]?.message}
          </p>
          <input
            type="text"
            className="inputfield "
            placeholder="Confirm Password"
            {...register("password.1", {
              required: {
                value: true,
                message: "please enter password",
              },
              minLength: {
                value: 6,
                message: "password contain atleast 6 characters",
              },
            })}
          />
          <p style={{ color: "brown", fontSize: "16px" }}>
            {errors.password?.[1]?.message}
          </p>
        </div>
        <div className="buttons">
          <button className="submitButton">Submit</button>
        </div>
        <p style={{ color: "brown", fontSize: "18px" }}>{errMessage}</p>
      </form>
    </>
  );
};

export default ResetPassword;
