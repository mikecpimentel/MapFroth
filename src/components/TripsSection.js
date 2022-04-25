import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Trip } from "./Trip";
import { NewTrip } from "./NewTrip";

const tempToken = "";

const devMode = process.env.NODE_ENV === "development";

const apiURL = devMode ? "http://localhost:3001" : "https://api.mapfroth.com";

export const TripsSection = (props) => {
   const [tripsList, setTripsList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const { getAccessTokenSilently } = useAuth0();

   useEffect(() => {
      (async () => {
         const token = devMode ? tempToken : await getAccessTokenSilently();
         const response = await axios.get(`${apiURL}/trips`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         // Fetches all trips from database, but I only want to work with
         // one trip for development
         setTripsList([response.data[0]]);
         setIsLoading(false);
      })();
   }, []);

   if (isLoading) return "Things are currently loading";

   return (
      <div>
         {tripsList.map((item) => (
            <Trip
               key={item.id}
               data={item}
               map={props.map}
               currentPoint={props.currentPoint}
            />
         ))}
         {false && <NewTrip />}
      </div>
   );
};
