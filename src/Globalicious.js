import React, { useEffect, useState } from "react";
import CountryNamesFilters from "./components/CountryNamesFilters";
import "./globalicious.css";
import useCountryNames from "./useCountryNames";
import { getAccessTokenSilently, useAuth0 } from "@auth0/auth0-react";

const Globalicious = () => {
   const { getAccessTokenSilently } = useAuth0();
   const [accessToken, setAccessToken] = useState();
   console.log("Globalicious");

   
   // const [countryNames, isLoadingNames, error] = useCountryNames();
   /*
   if (isLoadingNames) {
      console.log("Globalicious > Loading");
      return "Loading";
   }
   if (error) {
      console.log("Globalicious > error");
      return error;
   }
*/
   return null;
   /*
   return (<div id="globalicious-wrapper">
         
         <CountryNamesFilters />
         {countryNames.map((item) => (
            <a className="country-name" key={item.name.official}>{item.name.common}</a>
         ))}
      </div>
   );
   */
};

export default Globalicious;
