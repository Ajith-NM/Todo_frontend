
import axios from "axios";

 export const request=axios.create({
    baseURL:"http://localhost:4001/",
    withCredentials:true,
    // headers:{
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // }
  })