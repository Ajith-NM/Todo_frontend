

import { Outlet, Navigate } from "react-router-dom";


const PrivateRoute = () => {

    if (localStorage.getItem('user')) {
        return <Outlet/> 
    }
  return  <Navigate to={"/"}></Navigate>
    
  
}

export default PrivateRoute