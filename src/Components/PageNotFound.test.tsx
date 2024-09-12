import {describe,expect,it, }from "vitest"
import {screen,render,} from "@testing-library/react"
import PageNotFound from "./PageNotFound"



describe("Page-not-found",()=>{
    render(<PageNotFound/>)
    it("pagenotfound",()=>{
     
     expect(screen.findByText("PageNotFound"))
    })
    })