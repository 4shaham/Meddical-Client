import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="539204386893-kgkjgd2hs1mn8oh8t1rrq7u3jj70c3c3.apps.googleusercontent.com">
        <Provider store={store}> 
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
