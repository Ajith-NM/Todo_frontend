import { useParams } from "react-router-dom"
import  { AxiosError, AxiosResponse } from "axios";
import "./Validation.css"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { request } from "../../../AxiosConfig";
import { useState } from "react";
const EmailVerification = () => {
  const {preComp}=useParams()
  const [errMessage,setErrMessage]=useState("")
 const navigate = useNavigate()
  type FormValues={
    otp:string
  }
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors } = formState
   const onsubmit=(data:FormValues)=>{
    request.post("user/emailVerification",data).then((data:AxiosResponse)=>{
      console.log(data.data.result);
      if (data.data.result==="email verified successfully") {
        if (preComp==="Signup") {
          navigate("/")
        }
        else{
          navigate("/resetPassword")
        }
        
      }
      else{
setErrMessage(data.data.result)
      }
    }).catch((err:AxiosError)=>{
     console.log(err.response?.data);
     setErrMessage("something went wrong")
    })
   }
  return (
   <>
   <form className="loginform validation" onSubmit={handleSubmit(onsubmit)}>

    <div className="inputTag">
    <p>Please enter the OTP that send to your email. </p>
    <input type="text" className="inputfield"  placeholder="OTP"  {...register("otp",{
            required: {
              value: true, message: "Please enter OTP"
            },
            minLength:{
              value:8,message:" 8 character requires"

            }
          })}/>
          <span>{errors.otp?.message}</span>
    </div>
    <div className="buttons">
        <button className="submitButton">Verify</button>
    </div>
    <p style={{color:"brown"}}>{errMessage}</p>
   </form>
   </>
  )
}

export default EmailVerification