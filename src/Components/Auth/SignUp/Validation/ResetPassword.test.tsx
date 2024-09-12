import { describe,expect,it }from "vitest"
import {screen,render,} from "@testing-library/react"
import ResetPassword from "./ResetPassword"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../../../redux/store"

describe("ResetPassword",()=>{
it("Form elements",()=>{
    render(
        <Provider store={store}>
        <BrowserRouter><ResetPassword/></BrowserRouter>  
        </Provider>
    )
    expect(screen.getByRole("button")).toBeInTheDocument()
    expect(screen.getByTestId("form")).toBeInTheDocument()
    expect(screen.getAllByRole("textbox"))

})

})