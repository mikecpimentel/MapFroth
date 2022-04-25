import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

const LoginButton = () => {
   const { loginWithRedirect } = useAuth0();

   return (
      <Button id="main-login-button" onClick={() => loginWithRedirect()}>
         Log In / Sign Up
      </Button>
   );
};

export default LoginButton;
