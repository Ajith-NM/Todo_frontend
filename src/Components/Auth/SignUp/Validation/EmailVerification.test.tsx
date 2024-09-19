import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import EmailVerification from "./EmailVerification";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store";

describe("EmailVerification", () => {
  it("Form-Elements",async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EmailVerification />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("p")).toHaveTextContent(
      "Please enter the OTP that send to your email."
    );
    expect(screen.getByTestId("msg")).toBeDefined();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("submit Form Api call", async () => {
    //const portalLoading = document.getElementById("loadingPortal")!;
    userEvent.setup();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EmailVerification />
        </BrowserRouter>
      </Provider>
    )
    const submitButton = screen.getByText("Verify")
    const input = screen.getByRole("textbox"); 
   expect(screen.getByTestId("errMsg")).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    await userEvent.type(input, "12345678");
    expect(input).toHaveValue("12345678");
    await userEvent.click(submitButton);
  expect( screen.getByTestId("errMsg")).toBeEmptyDOMElement()
  //expect(screen.getByText("Add a strong password.")).toBeInTheDocument()
    //expect( screen.getByTestId("errMsg")).toHaveTextContent("please enter correct otp") 
  });
});
