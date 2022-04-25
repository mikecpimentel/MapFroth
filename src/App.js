import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import logo from "./images/logo_plain.png";

import { MainMap } from "./components/MainMap";
import LoginButton from "./login";
import { Skeleton } from "@mui/material";

function App() {
   const { isAuthenticated, isLoading } = useAuth0();

   return (
      <div className="App">
         <header className="App-header">
            <div id="app-logo-div">
               <img id="mapfroth-logo" src={logo} />
            </div>
         </header>
         {isLoading ? (
            <div id="front-loading-skeleton">
               <Skeleton variant="text" width={400} height={50} />
               <Skeleton
                  sx={{ marginTop: "20px" }}
                  variant="text"
                  width={600}
                  height={30}
               />
               <Skeleton variant="text" width={400} height={30} />
               <Skeleton variant="rectangle" width={100} height={50} />
            </div>
         ) : isAuthenticated ? (
            <MainMap />
         ) : (
            <div
               style={{
                  width: "fit-content",
                  height: "100vh",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <h2
                  className="welcome"
                  style={{
                     fontFamily: "Righteous",
                     fontSize: "3.041rem",
                  }}
               >
                  Welcome to Mapfroth
               </h2>
               <p
                  style={{
                     marginTop: "30px",
                     lineHeight: "1.6",
                     fontSize: "1.25rem",
                     color: "#555",
                  }}
               >
                  I began this project on April 15, so functionality is still
                  limited.
                  <br />
                  But you are welcome to come inside!
               </p>
               <LoginButton />
               <div
                  style={{
                     fontSize: "1.25em",
                     width: "300px",
                     marginTop: "20px",
                  }}
               >
                  <p>
                     If you don't want to use your own credentials, you can use
                     a test account:
                  </p>
                  <p style={{ marginTop: "20px" }}>Username: username</p>
                  <p>Password: password</p>
               </div>
            </div>
         )}
      </div>
   );
}

export default App;
