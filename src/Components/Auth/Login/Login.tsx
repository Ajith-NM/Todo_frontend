import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { request } from "../../AxiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
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
  localStorage.removeItem("userLogged")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let  userLogged:boolean
  const cookies = useRef(
    document.cookie
      .split(";")
      .reduce(
        (ac, cv) => Object.assign(ac, { [cv.split("=")[0]]: cv.split("=")[1] }),
        {}
      )
  );
if (localStorage.getItem('user')) {
  console.log(cookies);
   const resCookie: Record<string, string> = JSON.parse(
    JSON.stringify(cookies.current)
  );
  const token = resCookie[" token"];
  const decodedToken: { exp: number } = jwtDecode<{ exp: number }>(token);
  console.log("decoded Token=", decodedToken.exp);
  const currentTime = Date.now() / 1000;
   userLogged =currentTime < decodedToken.exp;
 
}

  const loader = useSelector((state: RootState) => state.loader.loader);
  const [errMessage, setErrMessage] = useState("");
  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const { errors } = formState;

  useEffect(() => {
    if (userLogged && localStorage.getItem("user")) {
      console.log("hii");
      navigate("/home");
    }
  }, [navigate]);
  
  const onSubmit = (data: FormValues) => {
    dispatch(addLoader());
    request
      .post("user/postLogin", data)
      .then((res: AxiosResponse) => {
        reset();
        dispatch(removeLoader());
        localStorage.setItem("user", res.data.user.profilePic);
        navigate("/home");
      })
      .catch((err: AxiosError<Response>) => {
        reset();
        dispatch(removeLoader());
        const errorRes = err.response?.data.msg;
        setErrMessage(errorRes!);
      });
  };

  const onGoogleAuthSubmit = async (data: CredentialResponse) => {
    dispatch(addLoader());
    const userData: Decoded = jwtDecode<Decoded>(data?.credential ?? "");
    if (userData) {
      await request
        .post("user/postLogin/Auth", userData)
        .then((res: AxiosResponse) => {
          console.log("res",res);
          
          dispatch(removeLoader());
          if (res.data.status) {
            localStorage.setItem("user", res.data.user.profilePic);
            navigate("/home");
          }
        })
        .catch((err: AxiosError<Response>) => {
          console.log("err",err);
          
          dispatch(removeLoader());
          if (!err.response?.data.status) {
            const errorRes = err.response?.data.msg;
            setErrMessage(errorRes!);
          }
          setErrMessage("something went wrong ");
        });
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
