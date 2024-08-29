
import axios from "axios";

 export const request=axios.create({
    baseURL:"https://todo-backend-mp1m.onrender.com/",
    withCredentials:true,
   // headers:{
     // "Access-Control-Allow-Origin": "https://todolistfocus.netlify.app",
      //Accept: 'application/json',
      // 'Content-Type': 'application/json',
   // }
  })