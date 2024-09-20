//import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
  // </StrictMode>,
);
