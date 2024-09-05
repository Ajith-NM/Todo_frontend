import { Routes, Route } from "react-router-dom";
import Home from "../Components/HomeComponent/Home";
import Login from "../Components/Auth/Login/Login";
import SignUp from "../Components/Auth/SignUp/SignUp";
import UpdateTodo from "../Components/Edit/UpdateTodo";
import PageNotFound from "../Components/PageNotFound";
import EmailVerification from "../Components/Auth/SignUp/Validation/EmailVerification";
import ForgetPassword from "../Components/Auth/SignUp/Validation/ForgetPassword";
import ResetPassword from "../Components/Auth/SignUp/Validation/ResetPassword";
import PrivateRoute from "./PrivateRoute";

function PageNavigation() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/Signup" element={<SignUp />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/edit/:id" element={<UpdateTodo />}></Route>
      </Route>
      <Route  path="/verification/:preComp" element={<EmailVerification />}></Route>
      <Route path="/forgetPassword" element={<ForgetPassword />}></Route>
      <Route path="/resetPassword" element={<ResetPassword />}></Route>

      <Route path="*" element={<PageNotFound />}></Route>
    </Routes>
  );
}
export default PageNavigation;
