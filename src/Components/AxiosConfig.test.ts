import {describe,expect,it }from "vitest"
import { request } from "./AxiosConfig"

describe("AxiosConfig.ts",()=>{
it("baseUrl",()=>{
expect(request.defaults.baseURL).toBe("https://todo-backend-k3fp.onrender.com/")
})
})