import { describe,expect,it }from "vitest"
import {screen,render,} from "@testing-library/react"
import NavBar from "./NavBar"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../redux/store"


describe("NavBar",()=>{
    it("Nav",()=>{
        render(
            <Provider store={store}>
            <BrowserRouter><NavBar/></BrowserRouter>  
            </Provider>
            )
        const image=screen.getByAltText("profile image")
        expect(screen.getByText("Focus")).toBeInTheDocument()
        expect(screen.getByText("LogOut")).toBeInTheDocument()
        expect(image).toHaveAttribute("src")


    })

    })