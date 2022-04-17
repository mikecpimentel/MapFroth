import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

import App from "./App";

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Auth0Provider
            domain="dev-enhwcift.us.auth0.com"
            clientId="kQPIZrh1ejWDQc33r6xQknzDlVCZ6ITb"
            audience="User Resources"
            redirectUri="http://localhost:3000"
         >
            <App />
         </Auth0Provider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById("root")
);
