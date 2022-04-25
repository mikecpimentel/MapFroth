import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const appURL =
   process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://mapfroth.com";

const LogoutButton = () => {
   const { logout } = useAuth0();

   return <button onClick={() => logout({ returnTo: appURL })}>Log Out</button>;
};

export default LogoutButton;
