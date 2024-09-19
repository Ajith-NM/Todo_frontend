import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import ResetPassword from "./ResetPassword";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";
import userEvent from "@testing-library/user-event";

describe("ResetPassword", () => {
  it("Elements in the form", async() => {
    userEvent.setup()
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByText("Add a strong password.")).toBeInTheDocument();
    const button=screen.getByRole("button")
    expect(button).toBeInTheDocument();
    const inputs=screen.getAllByRole("textbox")

    await userEvent.type(inputs[0],"12345678")
    await userEvent.type(inputs[1],"12345679")
    await userEvent.click(button)
    expect(screen.getByTestId("errorMsg")).toHaveTextContent("please enter same password");

     await userEvent.clear(inputs[1])
     await userEvent.type(inputs[1],"12345678")
     expect(inputs[1]).toHaveValue("12345678")
     await userEvent.click(button)
     expect(screen.getByTestId("errorMsg")).toHaveTextContent("reset password failed");

  });
});
