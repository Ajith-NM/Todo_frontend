import { describe,expect,it }from "vitest"
import {screen,render,} from "@testing-library/react"
import ForgetPassword from "./ForgetPassword"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../../../redux/store"
import userEvent from "@testing-library/user-event"

describe("ForgetPassword",()=>{
it("Form elements",()=>{
    render(
        <Provider store={store}>
        <BrowserRouter><ForgetPassword/></BrowserRouter>  
        </Provider>
    )
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByTestId("form")).toBeInTheDocument()
    expect(screen.getByRole("textbox"))

})
it("api call testing",async()=>{
   // const portalLoading = document.getElementById("loadingPortal")!;
    userEvent.setup();
    render(
        <Provider store={store}>
        <BrowserRouter><ForgetPassword/></BrowserRouter>  
        </Provider>
    )
    const submitButton = screen.getByTestId("submit")
    const error = screen.getByTestId("error")
    //expect(screen.getByTestId("loader")).toBeNull()
    await userEvent.click(submitButton);
    expect(error).toHaveTextContent("please enter email");

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "example@gmail.com");
    expect(input).toHaveValue("example@gmail.com");
    await userEvent.click(submitButton);
    expect(await screen.findByTestId("errMsg")).toHaveTextContent( "something went wrong")
})

})