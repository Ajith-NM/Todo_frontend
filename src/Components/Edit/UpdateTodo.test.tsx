
import * as router from 'react-router'
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, render, } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import UpdateTodo from "./UpdateTodo";

describe("Update-todo Component", () => {
  const navigate = vi.fn()
  beforeEach(() => {
    vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
  })

  it("UseEffect-get request", async () => {
    userEvent.setup();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpdateTodo />
        </BrowserRouter>
      </Provider>
    );
    expect(await screen.findByRole("heading")).toHaveTextContent("Test Title");
    expect(await screen.findByTestId("description")).toHaveTextContent(
      "Test description"
    );
    expect(screen.getByRole("button")).toHaveTextContent("Save");
    const select = screen.getByTestId("select");
    expect(select).toHaveValue("pending");
    await userEvent.selectOptions(select, "completed");
    expect(select).toHaveValue("completed");
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(navigate).toHaveBeenCalledWith('/home')
  });
});
