import {describe,expect,it }from "vitest"
import { request } from "./AxiosConfig"

describe("AxiosConfig.ts",()=>{
it("baseUrl",()=>{
expect(request.defaults.baseURL).toBe("http://localhost:4000/")
})
})