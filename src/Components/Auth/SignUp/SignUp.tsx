import { NavLink, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { AxiosResponse } from "axios";
import { request } from "../../AxiosConfig";

const SignUp = () => {
  const navigate = useNavigate();
  type FormValues = {
    name: string;
    email: string;
    password: string;
  };
  const [image, setImage] = useState<string>(
    "https://res.cloudinary.com/dsxhonntu/image/upload/v1722830068/samples/smile.jpg"
  );
  const [file, setFile] = useState<File>();
  const [errMessage, setErrMessage] = useState("");

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const formdata = new FormData();
  const onSubmit = async (data: FormValues) => {
    formdata.append("email", data.email);
    formdata.append("username", data.name);
    formdata.append("password", data.password);
    if (file) {
      formdata.append("image", file);
      await request
        .post("user/postSignup", formdata)
        .then((res: AxiosResponse) => {
          if (res.data.status === "inserted") {
            navigate("/verification/Signup");
          } else {
            setErrMessage(res.data.status);
          }
        })
        .catch(() => {
          setErrMessage("something went wrong");
        });
    } else {
      setErrMessage("please select a profile photo");
    }
  };

  function imageUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(() => files[0]);
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
      <h1 className="title">Sign Up</h1>
      <div className="inputs">
        <div className="profile">
          <div className="profile-img">
            <img src={image} alt="Profile" />
          </div>

          <div className="round">
            <input type="file" onChange={imageUpload} />
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
