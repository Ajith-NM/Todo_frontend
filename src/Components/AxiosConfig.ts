
import axios from "axios";

 export const request=axios.create({
    baseURL:"http://localhost:4001/",
    withCredentials:true,
   // headers:{
      //"Access-Control-Allow-Origin": "https://todolistfocus.netlify.app",
      //Accept: 'application/json', https://todo-api-mysql.onrender.com/
      // 'Content-Type': 'application/json',
   // } 
  })