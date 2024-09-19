import { describe, expect, it } from "vitest";
import { screen, render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("App.tsx", () => {
  it("Render App ", () => {
    render(
        <GoogleOAuthProvider clientId="185183929222-jos17curep6q4eo2lsg8hjqt0gjcq5ja.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    );
    
   expect(screen.getByRole("heading")).toHaveTextContent("Welcome Back")
  });
});
