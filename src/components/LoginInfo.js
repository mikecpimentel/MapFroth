import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const LoginInfo = () => {
   const { getAccessTokenSilently } = useAuth0();
   const [apiResponse, setApiReponse] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      (async () => {
         try {
            const token = await getAccessTokenSilently();
            console.log(token);

            const response = await fetch("http://localhost:3001/users", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setApiReponse(await response.json());
            setIsLoading(false);
         } catch (e) {
            setError(e);
         }
      })();
   }, []);

   if (isLoading) return <p>Component loading</p>;
   if (error) return <p>error</p>;

   return (
      <div>
         <p>Logged In Using:</p>
         <p>Google: {apiResponse.google_connected ? "True" : "False"}</p>
         <p>Github: {apiResponse.github_connected ? "True" : "False"}</p>
         <p>
            With email & password:{" "}
            {apiResponse.auth_0_connected ? "True" : "False"}
         </p>
      </div>
   );
};
