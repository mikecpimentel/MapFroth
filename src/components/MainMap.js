import mapboxgl from "mapbox-gl";
import { useEffect, useState, useRef } from "react";
import countriesData from "../finalData.geojson";
import { useAuth0 } from "@auth0/auth0-react";
import MainOverlay from "./MainOverlay";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";

export const MainMap = () => {
   const { isAuthenticated, getAccessTokenSilently } = useAuth0();

   // I'll refresh and secure the Mapbox access token later. I'm using their free plan, so the access is limited anyhow.
   mapboxgl.accessToken =
      "pk.eyJ1IjoibWlrZWNwaW1lbnRlbCIsImEiOiJjbDF6NmNydHMwZGR1M29wanA0cG5udzIxIn0.9RStqXOlb2jdnO4I9bqgQg";

   const mapContainer = useRef(null);
   const map = useRef(null);
   const [lng, setLng] = useState(9);
   const [lat, setLat] = useState(36);
   const [zoom, setZoom] = useState(1.7);
   const [countriesList, setCountriesList] = useState(null);

   const addCountry = async (countryObject) => {
      const token = await getAccessTokenSilently();
      // to do: add error handling
      const response = await axios.post(
         "http://localhost:3001/locations/country",
         countryObject,
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      );
      setCountriesList((currentState) => {
         return [...currentState, countryObject];
      });
   };

   useEffect(() => {
      (async () => {
         const token = await getAccessTokenSilently();
         console.log(token);
         const response = await axios.get(
            "http://localhost:3001/locations/country",
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         const data = response.data;
         setCountriesList(data);

         if (map.current) return; // initialize map only once
         map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mikecpimentel/cl1z4t72o000015mj8g706rpv",
            center: [lng, lat],
            zoom: zoom,
         });
         let hoveredStateId = null;
         map.current.on("load", () => {
            map.current.addSource("states", {
               // country-boundaries-simplified
               type: "geojson",
               data: countriesData,
               // generateId: true,
            });
            map.current.addLayer({
               id: "state-fills",
               type: "fill",
               source: "states",
               layout: {},
               paint: {
                  "fill-color": [
                     "case",
                     ["boolean", ["feature-state", "list_1"], false],
                     "#FFCF00",
                     "#fff",
                  ],
                  "fill-opacity": [
                     "case",
                     [
                        "any",
                        ["boolean", ["feature-state", "hover"], false],
                        ["boolean", ["feature-state", "list_1"], false],
                     ],
                     0.7,
                     0,
                  ],
               },
            });
            map.current.addLayer({
               id: "state-borders",
               type: "line",
               source: "states",
               layout: {},
               paint: {
                  "line-color": "#627BC1",
                  "line-width": 0,
               },
            });
            for (let i = 0; i < data.length; i++) {
               map.current.setFeatureState(
                  { source: "states", id: data[i].country_id },
                  { list_1: true }
               );
            }
            map.current.on("mousemove", "state-fills", (e) => {
               if (e.features.length > 0) {
                  if (hoveredStateId !== null) {
                     map.current.setFeatureState(
                        { source: "states", id: hoveredStateId },
                        { hover: false }
                     );
                  }
                  // setHoveredStateId(e.features[0].id);
                  hoveredStateId = e.features[0].id;
                  map.current.setFeatureState(
                     { source: "states", id: hoveredStateId },
                     { hover: true }
                  );
               }
            });
            map.current.on("mouseleave", "state-fills", () => {
               if (hoveredStateId !== null) {
                  map.current.setFeatureState(
                     { source: "states", id: hoveredStateId },
                     { hover: false }
                  );
               }
               hoveredStateId = null;
            });
            map.current.on("click", "state-fills", (e) => {
               const selectStatus = map.current.getFeatureState({
                  source: "states",
                  id: e.features[0].id,
               });
               if (!selectStatus.list_1) {
                  map.current.setFeatureState(
                     { source: "states", id: e.features[0].id },
                     { list_1: true }
                  );
                  const newCountryObject = {
                     country_id: e.features[0].id,
                     name: e.features[0].properties.name,
                  };
                  addCountry(newCountryObject);
               }
            });
         });
      })();
   }, []);

   useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on("move", () => {
         setLng(map.current.getCenter().lng.toFixed(4));
         setLat(map.current.getCenter().lat.toFixed(4));
         setZoom(map.current.getZoom().toFixed(2));
      });
   });
   return (
      <>
         <div ref={mapContainer} className="map-container" />
         {countriesList && (
            <>
               <div className="sidebar">
                  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
               </div>
               <MainOverlay data={countriesList} />
            </>
         )}
      </>
   );
};
