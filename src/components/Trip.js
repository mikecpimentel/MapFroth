import { Leg } from "./Leg";
import "./trip.css";
import AddIcon from "@mui/icons-material/Add";
import { Paper, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import marker from "../images/mapbox-marker-icon-20px-red.png";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const tripLegs = [
   {
      id: 1,
      leg_start: "Amsterdam",
      leg_end: "London",
      mode: "flight",
   },
   {
      id: 2,
      leg_start: "Tokyo",
      leg_end: "Perth",
      mode: "flight",
   },
];

const mockDatabaseRows = [
   {
      id: 1,
      data_id: "place.11281117170789660",
      lat: "-75.690057",
      long: "45.421143",
      name: "Ottawa",
   },
   {
      id: 2,
      data_id: "place.5091609961770750",
      lat: "4.351697",
      long: "50.846557",
      name: "Brussels",
   },
   {
      id: 3,
      data_id: "place.10708255346562040",
      lat: "-3.703583",
      long: "40.416705",
      name: "Madrid",
   },
   {
      id: 4,
      data_id: "place.6694790146427640",
      lat: "-118.2439",
      long: "34.0544",
      name: "Los Angeles",
   },
   {
      id: 5,
      data_id: "place.12892673545980170",
      lat: "-43.2094",
      long: "-22.911",
      name: "Rio De Janeiro",
   },
];

const pointFeatures = [];

for (let i = 0; i < mockDatabaseRows.length; i++) {
   pointFeatures.push({
      type: "Feature",
      properties: {},
      geometry: {
         type: "Point",
         coordinates: [mockDatabaseRows[i].lat, mockDatabaseRows[i].long],
      },
   });
}

const point = {
   type: "FeatureCollection",
   features: pointFeatures,
};

export const Trip = ({ data, map, currentPoint }) => {
   const [tripPoints, setTripPoints] = useState(mockDatabaseRows);

   const handleAddPoint = () => {
      const newPointObject = {
         id: currentPoint.result.id,
         data_id: currentPoint.result.id,
         lat: currentPoint.result.geometry.coordinates[0],
         long: currentPoint.result.geometry.coordinates[1],
         name: currentPoint.result.text,
      };
      setTripPoints((currState) => {
         return [...currState, newPointObject];
      });
   };

   const handlePointDelete = (dataId) => {
      console.log(dataId);
      setTripPoints((currState) => {
         return currState.filter((item) => item.data_id !== dataId);
      });
   };

   useEffect(() => {
      map.current.loadImage(marker, (error, image) => {
         if (error) throw error;

         map.current.addImage("red-spot", image);

         map.current.addSource("point", {
            type: "geojson",
            data: point,
         });

         map.current.addLayer({
            id: "points",
            type: "symbol",
            source: "point", // reference the data source
            layout: {
               "icon-image": "red-spot", // reference the image
               "icon-size": 1,
            },
         });
      });
   }, []);

   return (
      <div id="trip-item">
         {data.name}
         <div
            style={{
               display: "flex",
               flexWrap: "wrap",
               gap: "5px",
               marginTop: "20px",
            }}
         >
            <Typography sx={{ color: "#555" }}>
               Temp Note: Use map search box to find location. A button will
               appear here to add new location.
            </Typography>
            {tripPoints.map((item) => (
               <Chip
                  sx={{ backgroundColor: "#D7263D", color: "#fff" }}
                  label={item.name}
                  onDelete={() => handlePointDelete(item.data_id)}
               />
            ))}
            {currentPoint &&
               !tripPoints.find(
                  (point) => point.data_id === currentPoint.result.id
               ) && (
                  <Chip
                     sx={{ backgroundColor: "#2589BD", color: "#fff" }}
                     label="Add Current Point"
                     onClick={handleAddPoint}
                  />
               )}
         </div>
         <div id="trip-legs" style={{ marginTop: "10px" }}>
            <Typography sx={{ color: "#555" }}>
               Temp Note: Items below have no function yet. Design will also
               change. Implementing drag-and-drop functionality.
            </Typography>
            {tripLegs.map((item) => (
               <Leg key={item.id} data={item} />
            ))}
         </div>
         <Button
            variant="outlined"
            sx={{ width: "100%", marginTop: "10px" }}
            endIcon={<AddIcon />}
         >
            Add (no function yet)
         </Button>
      </div>
   );
};
