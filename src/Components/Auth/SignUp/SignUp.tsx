import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { request } from "../../AxiosConfig";
import Loader from "../../Loader";
import { useSelector, useDispatch } from "react-redux";
import { addLoader, removeLoader } from "../../../redux/Actions/LoadingSlice";
import { RootState } from "../../../redux/store";

type FormValues = {
  name: string;
  email: string;
  password: string;
  image: File[];
};
type Decoded = {
  name: string;
  picture: string;
  email: string;
};

type Response = {
  status: boolean;
  msg: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>(
    "https://res.cloudinary.com/dsxhonntu/image/upload/v1722830068/samples/smile.jpg"
  );
  const [errMessage, setErrMessage] = useState<string>("");
  const loader = useSelector((state: RootState) => state.loader.loader);

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const formdata = new FormData();

  const onSubmit = async (data: FormValues) => {
    formdata.append("email", data.email);
    formdata.append("username", data.name);
    formdata.append("password", data.password);

    if (data.image[0]) {
      dispatch(addLoader());
      formdata.append("image", data.image[0]);
      await request
        .post("user/postSignup", formdata)
        .then((res: AxiosResponse) => {
          dispatch(removeLoader());
          if (res.data.status) {
            navigate("/verification/Signup");
          }
        })
        .catch((err: AxiosError<Response>) => {
          dispatch(removeLoader());
          if (!err.response?.data.status) {
            const errorRes = err.response?.data.msg;
            setErrMessage(errorRes!);
          }
          setErrMessage("something went wrong ");
        });
    } else {
      setErrMessage("Please select an image");
    }
  };

  const onGoogleAuthSubmit = async (data: CredentialResponse) => {
    dispatch(addLoader());
    const userData: Decoded = jwtDecode<Decoded>(data?.credential ?? "");
    if (userData) {
      await request
        .post("user/postSignup/Auth", userData)
        .then((res: AxiosResponse) => {
          dispatch(removeLoader());
          if (res.data.status) {
            navigate("/verification/Signup");
          }
        })
        .catch((err: AxiosError<Response>) => {
          dispatch(removeLoader());
          if (!err.response?.data.status) {
            const errorRes = err.response?.data.msg;
            setErrMessage(errorRes!);
          }
          setErrMessage("something went wrong ");
        });
    }
  };

  function imageUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
    }
  }

  return (
    <form className="signupform" onSubmit={handleSubmit(onSubmit)}>
      {loader && <Loader />}
      <h1 className="title">Sign Up</h1>

      {/* google auth   /postSignup/Auth */}
      <GoogleLogin
        text="continue_with"
        onSuccess={(credentialResponse) =>
          onGoogleAuthSubmit(credentialResponse)
        }
        onError={() => {
          console.log("Login Failed");
        }}
      />

      <div className="inputs">
        <div className="profile">
          <div className="profile-img">
            <img src={image} alt="Profile" />
          </div>

          <div className="round">
            <input
              type="file"
              {...register("image", {
                required: false,
              })}
              onChange={imageUpload}
            />
            <i className="bx bxs-camera-plus"></i>
          </div>
        </div>

        <div className="input">
          <input
            type="text"
            id="name"
            placeholder="Username"
            {...register("name", {
              required: {
                value: true,
                message: "Please enter Username",
              },
            })}
          />
          <p> {errors.name?.message}</p>
        </div>

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
              validate: (fieldValue) => {
                return (
                  fieldValue !== "admin@gmail.com" || "enter another email"
                );
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>

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
          <p>{errors.password?.message}</p>
        </div>
      </div>
      <div className="button">
        <button>submit</button>
      </div>
      <p>
        Already have an account! <NavLink to="/">Login</NavLink>
      </p>
      <p style={{ color: "brown" }}>{errMessage}</p>
    </form>
  );
};

export default SignUp;
