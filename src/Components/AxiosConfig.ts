
import axios from "axios";

 export const request=axios.create({

    baseURL:"https://todo-backend-k3fp.onrender.com/",
    withCredentials:true,
   //  headers:{https://todo-backend-k3fp.onrender.com
   //    "Access-Control-Allow-Origin": "https://todolistfocus.netlify.app",
   //    Accept: 'application/json',
   //    'Content-Type': 'application/json',
   //  } 
  })