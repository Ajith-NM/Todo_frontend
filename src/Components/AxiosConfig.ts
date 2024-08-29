
import axios from "axios";

 export const request=axios.create({
    baseURL:"https://todo-backend-mp1m.onrender.com/",
    withCredentials:true,
    // headers:{
      // Accept: 'application/json',
       //'Content-Type': 'application/json',
    // }
  })