import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { request } from "../../AxiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Loader from "../../Loader";
import { addLoader, removeLoader } from "../../../redux/Actions/LoadingSlice";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type FormValues = {
  email: string;
  password: string;
};

type Decoded = {
  email: string;
};

type Response = {
  status: boolean;
  msg: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loader = useSelector((state: RootState) => state.loader.loader);
  const [errMessage, setErrMessage] = useState("");
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const submit = (url: string, data: FormValues | Decoded) => {
    request
      .post(url, data)
      .then((res: AxiosResponse) => {
        dispatch(removeLoader());
        if (res.data.status) {
          localStorage.setItem("user", res.data.user.profilePic);
          navigate("/home");
        }
      })
      .catch((err: AxiosError<Response>) => {
        dispatch(removeLoader());
        const errorRes = err.response?.data.msg;
        setErrMessage(errorRes!);
      });
  };

  useEffect(() => {
    request
      .get("user/Authentication")
      .then(() => {
        navigate("/home");
      })
      .catch(() => {
        localStorage.removeItem("user");
      });
  }, []);

  const onSubmit = (data: FormValues) => {
    dispatch(addLoader());
    submit("user/postLogin", data);
  };

  const onGoogleAuthSubmit = async (data: CredentialResponse) => {
    dispatch(addLoader());
    const userData: Decoded = jwtDecode<Decoded>(data?.credential ?? "");
    if (userData) {
      submit("user/postLogin/Auth", userData);
    }
  };

  return (
    <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title">Welcome Back</h1>
      {loader && <Loader />}
      <GoogleLogin
        text="signin"
        onSuccess={(credentialResponse) =>
          onGoogleAuthSubmit(credentialResponse)
        }
        onError={() => {
          console.log("Login Failed");
        }}
        shape="pill"
        theme="filled_blue"
        type="icon"
      />

      <p style={{ marginTop: "20px" }}>OR</p>
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
