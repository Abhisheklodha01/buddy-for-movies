import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./AppWrapper";
import "./index.css";
import { Toaster } from "react-hot-toast";

export const Context = createContext({ isAuthenticated: false });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <AppWrapper />
    <Toaster />
  </div>
);
