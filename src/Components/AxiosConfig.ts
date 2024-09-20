
import axios from "axios";

 export const request=axios.create({

    baseURL:import.meta.env.VITE_Base_Url,
    withCredentials:true,
   //  headers:{
   //    "Access-Control-Allow-Origin": "https://todolistfocus.netlify.app",
   //    Accept: 'application/json',
   //    'Content-Type': 'application/json',
   //  } 
  })