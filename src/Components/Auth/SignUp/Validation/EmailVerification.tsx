import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import "./Validation.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { request } from "../../../AxiosConfig";
import { useState } from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Loader from "../../../Loader";
// import {
//   addLoader,
//   removeLoader,
// } from "../../../../redux/Actions/LoadingSlice";
// import Loader from "../../../Loader";

type FormValues = {
  otp: string;
};
type Response = {
  status: boolean;
  msg: string;
};

const EmailVerification = () => {
  const { preComp } = useParams();
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
 // const dispatch = useDispatch();
  const loader = useSelector((state: RootState) => state.loader.loader);

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
   // dispatch(addLoader());
   request
     .post("user/emailVerification", data)
     .then((data: AxiosResponse) => {
     //  dispatch(removeLoader());
        if (data.data.status) {
           if (preComp === "Signup") {
            navigate("/");
           } else {
             navigate("/resetPassword");
           }
        }
     })
     .catch((err: AxiosError<Response>) => {
     //  dispatch(removeLoader());
        const errorRes = err.response?.data.msg;
       setErrMessage(errorRes!);
     });
  };
  return (
    <>
      <form className="loginform validation" onSubmit={handleSubmit(onSubmit)} data-testid="form">
        {loader && <Loader/>}
        <div className="inputTag">
          <p data-testid="p">Please enter the OTP that send to your email. </p>
          <input
            type="text"
            className="inputfield"
            placeholder="OTP"
            {...register("otp", {
              required: {
                value: true,
                message: "Please enter OTP",
              },
              minLength: {
                value: 8,
                message: " 8 character requires",
              },
            })}
          />
          <span data-testid="msg">{errors.otp?.message}</span>
        </div>
        <div className="buttons">
          <button className="submitButton" data-testid="submit">Verify</button>
        </div>
        <p style={{ color: "brown" }} data-testid="errMsg">{errMessage}</p>
      </form>
    </>
  );
};

export default EmailVerification;
