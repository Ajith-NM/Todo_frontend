import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { request } from "../../AxiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  type FormValues = {
    email: string;
    password: string;
  };
  const [errMessage, setErrMessage] = useState("");

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const onSubmit = (data: FormValues) => {
    console.log("submitted", data);
    request
      .post("user/postLogin", data)
      .then((res: AxiosResponse) => {
        if (res.data.status === "success") {
          localStorage.setItem("user", res.data.user.profilePic);
          navigate("/home");
        } else {
          setErrMessage(res.data.status);
        }
      })
      .catch((err:AxiosError) => {
        console.log("Error res==",err);
        
        setErrMessage("something went wrong");
      });
  };

  return (
    <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title">Welcome Back</h1>
      <div className="inputs">
        {/* email */}
        <div className="input">
          <input
            type="text"
            id="email"
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
          <p>{errors.email?.message}</p>
        </div>

        {/* password */}
        <div className="input">
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
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
          <span>
            <NavLink to={"/forgetPassword"}>Forget password?</NavLink>{" "}
          </span>
          <p>{errors.password?.message}</p>
        </div>
      </div>

      {/* button */}
      <div className="button">
        <button>Submit</button>
      </div>
      <p>
        Don't have an account? <NavLink to={"/signup"}>Signup</NavLink>{" "}
      </p>
      <p style={{ color: "brown" }}>{errMessage}</p>
    </form>
  );
};

export default Login;
