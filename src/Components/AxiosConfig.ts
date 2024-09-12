
import axios from "axios";

 export const request=axios.create({

    baseURL:"http://localhost:4000/",
    withCredentials:true,
   //  headers:{https://todo-backend-k3fp.onrender.com
   //    "Access-Control-Allow-Origin": "https://todolistfocus.netlify.app",
   //    Accept: 'application/json', https://todo-backend-lekf.onrender.com/
   //    'Content-Type': 'application/json',
   //  } 
  })