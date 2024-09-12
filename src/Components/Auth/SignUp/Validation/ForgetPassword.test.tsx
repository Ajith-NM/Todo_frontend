import { describe,expect,it }from "vitest"
import {screen,render,} from "@testing-library/react"
import ForgetPassword from "./ForgetPassword"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../../../redux/store"

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

})