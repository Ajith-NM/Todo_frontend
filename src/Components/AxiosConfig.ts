
import axios from "axios";

 export const request=axios.create({

    baseURL:"https://todo-backend-k3fp.onrender.com/",
    withCredentials:true,
   //  headers:{
   //    "Access-Control-Allow-Origin": "https://todolistfocus.netlify.app",
   //    Accept: 'application/json', https://todo-backend-lekf.onrender.com/
   //    'Content-Type': 'application/json',
   //  } 
  })