import { useNavigate } from "react-router-dom";
import "./Validation.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosResponse } from "axios";
import { request } from "../../../AxiosConfig";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState("");
  type FormValues = {
    password: string[];
  };

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    if (data.password[0] === data.password[1]) {
      request
        .put("user/resetPassword", { password: data.password[0] })
        .then((data: AxiosResponse) => {
          console.log(data.data.response);
          if (data.data.response === "updated") {
            navigate("/");
          } else {
            setErrMessage(data.data.response);
          }
        })
        .catch(() => setErrMessage("something went wrong"));
    } else {
      setErrMessage("please enter same password");
    }
  };

  return (
    <>
      <form className="loginform validation" onSubmit={handleSubmit(onSubmit)}>
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
