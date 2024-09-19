import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import PageNavigation from "./PageNavigation";

const App = ({ goTo }: { goTo: string }) => {
  return (
    <GoogleOAuthProvider clientId="185183929222-jos17curep6q4eo2lsg8hjqt0gjcq5ja.apps.googleusercontent.com">
      <Provider store={store}>
        <MemoryRouter initialEntries={[goTo]}>
          <PageNavigation />
        </MemoryRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
};

describe("Page-Navigation-test", () => {
  afterEach(() => localStorage.removeItem("user"));

  //login
  it("Render Login page", () => {
    render(
      <GoogleOAuthProvider clientId="185183929222-jos17curep6q4eo2lsg8hjqt0gjcq5ja.apps.googleusercontent.com">
        <Provider store={store}>
          <BrowserRouter>
            <PageNavigation />
          </BrowserRouter>
        </Provider>
      </GoogleOAuthProvider>
    );
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  //signUp
  it("Render SignUp page", () => {
    render(<App goTo={"/Signup"} />);
    expect(screen.getByRole("heading")).toHaveTextContent("Sign Up");
  });

  // Email verification
  it("Render verification page", () => {
    render(<App goTo={"/verification/:Signup"} />);
    expect(screen.getByText("Verify")).toBeInTheDocument();
  });

  //Forget password
  it("Render verification page", () => {
    render(<App goTo={"/forgetPassword"} />);
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
  });

  //Reset password
  it("Render verification page", () => {
    render(<App goTo={"/resetPassword"} />);
    expect(screen.getByText("Add a strong password.")).toBeInTheDocument();
  });

  //Home
  it("Render Home page", () => {
    localStorage.setItem("user", "logged");
    render(<App goTo={"/home"} />);
    expect(screen.getByText("TODO LIST")).toBeInTheDocument();
  });

  it("Try to Render Home page", () => {
    render(<App goTo={"/home"} />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  //Edit
  it("Render Edit page", () => {
    localStorage.setItem("user", "logged");
    render(<App goTo={"/edit/3"} />);
    expect(screen.getByRole("button")).toHaveTextContent("Save");
  });
  it(" Try to Render Edit page", () => {
    render(<App goTo={"/edit/3"} />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  //Page not found
  it(" Render Page not found", () => {
    render(<App goTo={"/Page-not-found"} />);
    expect(screen.getByText("PageNotFound")).toBeInTheDocument()
  });
});
