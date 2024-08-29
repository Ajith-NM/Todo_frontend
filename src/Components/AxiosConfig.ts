
import axios from "axios";

 export const request=axios.create({
    baseURL:"https://todo-api-mysql.onrender.com/",
    withCredentials:true,
   // headers:{
     // "Access-Control-Allow-Origin": "https://todolistfocus.netlify.app",
      //Accept: 'application/json',
      // 'Content-Type': 'application/json',
   // }
  })