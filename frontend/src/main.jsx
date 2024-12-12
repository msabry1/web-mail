import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'; // Make sure this path matches the actual location of your CSS file


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*Provider*/}
    <App />
  </React.StrictMode>
);
