
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoute = () => {
  const cookies = useRef(
    document.cookie
      .split(";")
      .reduce(
        (ac, cv) => Object.assign(ac, { [cv.split("=")[0]]: cv.split("=")[1] }),
        {}
      )
  );
  const resCookie: Record<string, string> = JSON.parse(
    JSON.stringify(cookies.current)
  );
  const token = resCookie[" token"];
  const decodedToken: { exp: number } = jwtDecode<{ exp: number }>(token)
  console.log("decoded Token=", decodedToken.exp);
 const currentTime = Date.now() / 1000
const userLogged=useRef(currentTime < decodedToken.exp)

    if (userLogged&&localStorage.getItem('user')) {
        return <Outlet/> 
    }
  return  <Navigate to={"/"}></Navigate>
    
  
}

export default PrivateRoute