import { useEffect, useState } from "react";

const useCountryNames = () => {
   console.log("useCountryNames");
   const [countryNames, setCountryNames] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      console.log("useCountryNames > useEffect");
      fetch("https://restcountries.com/v3.1/all?fields=name")
         .then((results) => results.json())
         .then((data) => {
            setCountryNames(data);
            setIsLoading(false);
         })
         .catch((err) => setError(err));
   }, []);

   return [countryNames, isLoading, error];
};

export default useCountryNames;
