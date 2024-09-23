import { http, HttpResponse } from "msw";


let taskId=1
const Tasks=[ {
  task_Id: 1,
  title: "Test Title",
  description: "Test description",
  status: "pending",
  user_Id: 1,
  createdAt: "11-12-2024",
  updatedAt: "12-12-2024",
},]
export const handlers = [

  //email verification
  http.post(
    "https://todo-backend-k3fp.onrender.com/user/emailVerification",
    async ({ request }) => {
      const newdata = await request.json();
      console.log(newdata, "OTP");
      return HttpResponse.json(
        { status: true, msg: "email verified successfully" },
        { status: 200 }
      );
      
    }
  ),
  //forget Password
  http.post(
    "https://todo-backend-k3fp.onrender.com/user/forgetPassword",
    async ({ request }) => {
      const newdata = await request.json();
      console.log(newdata, "Email");

      return HttpResponse.json(
        { status: true, msg: "something went wrong" },
        { status: 400 }
      );
    }
  ),
  //Reset Password
  http.put(
    "https://todo-backend-k3fp.onrender.com/user/resetPassword",
    async ({ request }) => {
      const newdata = await request.json();
      console.log(newdata, "Password");

      return HttpResponse.json(
        { status: false, msg: "reset password failed" },
        { status: 400 }
      );
     
    }
  ),
  //get task 
  http.get(
    "https://todo-backend-k3fp.onrender.com/task/getTask/:id",
    async ({params}) => {
      const { id } = params
      console.log("task id =",id);
      
      const Task= {
        task_Id: 2,
        title: "Test Title",
        description: "Test description",
        status: "pending",
        user_Id: 1,
        createdAt: "11-12-2024",
        updatedAt: "12-12-2024",
      }

     return HttpResponse.json(
        { status: true, response: Task },
        { status: 200 }
      );
    }
  ),
  http.put(
    "https://todo-backend-k3fp.onrender.com/task/statusUpdate",
    async ({ request }) => {

      const url = new URL(request.url)
    const id = url.searchParams.get('id')

      const newdata = await request.json();
      console.log(newdata, "status update",id);

      return HttpResponse.json(
        { status: true, response: "task status updated"},
        { status: 200 }
      );
     
    }
  ),
  // Get All Task
  http.get(
    "https://todo-backend-k3fp.onrender.com/task/home",
    async () => {
      console.log("Get All Task");
     return HttpResponse.json(
        { status: true, response: Tasks},
        { status: 200 }
      );
    }
  ),
  //Create new task
  http.post(
    "https://todo-backend-k3fp.onrender.com/task/create",
    async ({ request }) => {
      const newdata = await request.json();
      console.log("new Task=",newdata);
      const Task= {
        task_Id: taskId+1,
        title: `Test Title ${taskId+1}`,
        description: `Test description ${taskId+1}`,
        status: "pending",
        user_Id: 1,
        createdAt: "11-12-2024",
        updatedAt: "12-12-2024",
      }
     taskId=taskId+1
      return HttpResponse.json(
        { status: true, response:Task},
        { status: 200 }
      );
    }
  ),
  

];
