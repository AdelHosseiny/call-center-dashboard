/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "App.css";

// Importing Provider from react-redux
import { Provider } from "react-redux";

// Import the store you created
import store from "./redux/store";  // Adjust the path according to your directory structure


// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}> {/* Wrapping App with Provider */}
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>
);
