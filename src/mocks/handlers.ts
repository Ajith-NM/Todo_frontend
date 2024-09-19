import { http, HttpResponse } from "msw";

export const handlers = [

  //email verification
  http.post(
    "https://todo-backend-k3fp.onrender.com/user/emailVerification",
    async ({ request }) => {
      const newdata = await request.json();
      console.log(newdata, "OTP");

      // return HttpResponse.json(
      //   { status: false, msg: "please enter correct otp" },
      //   { status: 400 }
      // );
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

];
