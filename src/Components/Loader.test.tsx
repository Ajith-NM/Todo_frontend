import { describe,expect,it }from "vitest"
import {screen,render,} from "@testing-library/react"
import Loader from "./Loader"

describe("portal loading",()=>{
it("loading",()=>{
    const portalRoot =document.getElementById("loadingPortal")!;

    if (portalRoot) {
        console.log("hii");
        render(
       <Loader/>
        )
        expect(screen.getByTestId("load")).toBeInTheDocument()
        expect(screen.getByTestId("loader")).toBeInTheDocument()
    }
})
})