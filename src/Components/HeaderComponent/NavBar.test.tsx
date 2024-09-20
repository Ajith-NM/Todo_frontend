import { beforeEach, describe,expect,it, vi }from "vitest"
import {screen,render,} from "@testing-library/react"
import NavBar from "./NavBar"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import * as router from 'react-router'
import { userEvent } from "@testing-library/user-event"

describe("NavBar",()=>{
    const navigate = vi.fn()
  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })
    it("Nav",async()=>{
        userEvent.setup();
        render(
            <Provider store={store}>
            <BrowserRouter><NavBar/></BrowserRouter>  
            </Provider>
            )
        const image=screen.getByAltText("profile image")
        expect(screen.getByText("Focus")).toBeInTheDocument()
        expect(screen.getByText("LogOut")).toBeInTheDocument()
        expect(image).toHaveAttribute("src")
        const button=screen.getByTestId("logout")
        await userEvent.click(button);
        expect(navigate).toHaveBeenCalledWith('/')

    })

    })