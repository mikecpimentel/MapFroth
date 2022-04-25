import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import App from "./App";

const appURL =
   process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://mapfroth.com";

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Auth0Provider
            domain="dev-enhwcift.us.auth0.com"
            clientId="kQPIZrh1ejWDQc33r6xQknzDlVCZ6ITb"
            audience="User Resources"
            redirectUri={appURL}
         >
            <App />
         </Auth0Provider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById("root")
);
