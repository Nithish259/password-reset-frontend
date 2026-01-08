import { StrictMode } from "react";
import axios from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
