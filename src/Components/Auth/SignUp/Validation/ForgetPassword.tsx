import { AxiosError } from "axios";
import { request } from "../../../AxiosConfig";
import "./Validation.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {  useSelector, } from "react-redux";
import { RootState } from "../../../../redux/store";
// import {
//   addLoader,
//   removeLoader,
// } from "../../../../redux/Actions/LoadingSlice";
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
  //const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.loader);
  const [errMessage, setErrMessage] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
   // dispatch(addLoader());
    request
      .post("user/forgetPassword", data)
      .then(() => {
      //  dispatch(removeLoader());
        navigate("/verification/:forget")
      })
      .catch((err: AxiosError<Response>) => {
       // dispatch(removeLoader());
        const errorRes = err.response?.data.msg;
        setErrMessage(errorRes!);
      });
  };

  return (
    <>
      <form className="loginform validation" onSubmit={handleSubmit(onSubmit)} data-testid="form">
        {loader && <Loader  data-testid="loader"/>}
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
        <p style={{ color: "brown" }} data-testid="error">{errors.email?.message}</p>
        <div className="buttons">
          <button className="submitButton" data-testid="submit">Next</button>
        </div>
        <p style={{ color: "brown" }} data-testid="errMsg">{errMessage}</p>
      </form>
    </>
  );
};

export default ForgetPassword;
