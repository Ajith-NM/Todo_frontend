import { AxiosResponse } from "axios";
import { request } from "../../../AxiosConfig";
import "./Validation.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  type FormValues = {
    email: string;
  };

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    request
      .post("user/forgetPassword", data)
      .then((data: AxiosResponse) => {
        //  console.log(data.data.result);
        if (data.data.response === "verify your email by entering the otp") {
          navigate("/verification/Forget");
        } else {
          setErrMessage(data.data.response);
        }
      })
      .catch(() => setErrMessage("something went wrong"));
  };

  return (
    <>
      <form className="loginform validation" onSubmit={handleSubmit(onSubmit)}>
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
