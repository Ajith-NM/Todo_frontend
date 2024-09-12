import { http, HttpResponse} from "msw";


export const handlers = [
  http.post("http://localhost:4000/user/emailVerification", async ({ request }) => {
    
    const newdata = await request.json();
   console.log(newdata, 'hyuioh');

  const res= HttpResponse.json({status: false, msg: "please enter correct otp"})
  console.log("response ",res);
 return res
  }),
];
