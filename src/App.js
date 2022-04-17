import "./App.css";
import LoginButton from "./login";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout";

import { useEffect, useState, useRef, useCallback } from "react";
import countriesData from "./finalData.geojson";
import logo from "./images/logo_plain.png";

import mapboxgl from "mapbox-gl";
import MainOverlay from "./components/MainOverlay";

const tempData = [
   {
      countryId: 64,
      countryName: "Ecuador",
   },
   {
      countryId: 22,
      countryName: "Burkina Faso",
   },
   {
      countryId: 98,
      countryName: "Isle of Man",
   },
   {
      countryId: 136,
      countryName: "Monaco",
   },
];

function App() {
   const { isAuthenticated } = useAuth0();

   mapboxgl.accessToken =
      "pk.eyJ1IjoibWlrZWNwaW1lbnRlbCIsImEiOiJjbDF6NmNydHMwZGR1M29wanA0cG5udzIxIn0.9RStqXOlb2jdnO4I9bqgQg";

   const mapContainer = useRef(null);
   const map = useRef(null);
   const [lng, setLng] = useState(9);
   const [lat, setLat] = useState(36);
   const [zoom, setZoom] = useState(1.7);
   const [countriesList, setCountriesList] = useState(tempData);

   useEffect(() => {
      if (!map.current) return;
   }, [countriesList]);

   useEffect(() => {
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
         for (let i = 0; i < countriesList.length; i++) {
            map.current.setFeatureState(
               { source: "states", id: countriesList[i].countryId },
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
                  countryId: e.features[0].id,
                  countryName: e.features[0].properties.name,
               };
               setCountriesList((currentState) => {
                  return [...currentState, newCountryObject];
               });
            }
         });
      });
   });

   useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on("move", () => {
         setLng(map.current.getCenter().lng.toFixed(4));
         setLat(map.current.getCenter().lat.toFixed(4));
         setZoom(map.current.getZoom().toFixed(2));
      });
   });

   return (
      <div className="App">
         <header className="App-header">
            <div id="app-logo-div">
               <img id="mapfroth-logo" src={logo} />
            </div>
         </header>
         <div>
            <div className="sidebar">
               Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
         </div>
         {isAuthenticated && <MainOverlay data={countriesList} />}
      </div>
   );
}

export default App;
