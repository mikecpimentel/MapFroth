import mapboxgl from "mapbox-gl";
import { useEffect, useState, useRef } from "react";
import countriesData from "../finalData.geojson";
import { useAuth0 } from "@auth0/auth0-react";
import MainOverlay from "./MainOverlay";
import axios from "axios";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import turfLength from "@turf/length";
import turfAlong from "@turf/along";

/**
 * Pardon the mess.
 * This page needs refactoring.
 * I created this in a hurry. Time was and continues to be "of the essence".
 * If you're an employer, please hire me.
 * Thank you!
 */

const devMode = process.env.NODE_ENV === "development";

const apiURL = devMode ? "http://localhost:3001" : "https://api.mapfroth.com";

const origin = [-118.2439, 34.0544];
// const origin2 = [-50.414, 50.776];

const destination = [-43.2094, -22.911];
// const destination2 = [50.032, 100.913];

const route = {
   type: "FeatureCollection",
   features: [
      {
         type: "Feature",
         geometry: {
            type: "LineString",
            coordinates: [origin, destination],
         },
      },
   ],
};

const lineDistance = turfLength(route.features[0]);

const arc = [];

const steps = 500;

for (let i = 0; i < lineDistance; i += lineDistance / steps) {
   const segment = turfAlong(route.features[0], i);
   arc.push(segment.geometry.coordinates);
}

route.features[0].geometry.coordinates = arc;

const tempToken = "";

export const MainMap = () => {
   const { getAccessTokenSilently } = useAuth0();

   // I'll refresh and secure the Mapbox access token later. I'm using their free plan, so the access is limited anyhow. Plus, the key's access is limited to https://mapfroth.com (when I'm not developing)
   mapboxgl.accessToken =
      "pk.eyJ1IjoibWlrZWNwaW1lbnRlbCIsImEiOiJjbDF6NmNydHMwZGR1M29wanA0cG5udzIxIn0.9RStqXOlb2jdnO4I9bqgQg";

   const mapContainer = useRef(null);
   const map = useRef(null);
   const [lng, setLng] = useState(9);
   const [lat, setLat] = useState(36);
   const [zoom, setZoom] = useState(1.7);
   const [countriesList, setCountriesList] = useState(null);
   const [mapLoaded, setMapLoaded] = useState(false);
   const [currentPoint, setCurrentPoint] = useState(null);

   const handleDeleteButton = async (country_id) => {
      const token = devMode ? tempToken : await getAccessTokenSilently();
      // const token = await getAccessTokenSilently();
      const body = {
         country_id: country_id,
      };
      const response = await axios.delete(`${apiURL}/locations/country`, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         data: body,
      });
      const newCountriesState = countriesList.filter(
         (item) => item.country_id !== country_id
      );
      setCountriesList(newCountriesState);
   };

   const addCountry = async (countryObject) => {
      const token = devMode ? tempToken : await getAccessTokenSilently();
      // const token = await getAccessTokenSilently();
      // to do: add error handling
      const response = await axios.post(
         `${apiURL}/locations/country`,
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
         const token = devMode ? tempToken : await getAccessTokenSilently();
         //const token = await getAccessTokenSilently();
         //console.log(await getAccessTokenSilently());
         const response = await axios.get(`${apiURL}/locations/country`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         const data = response.data;
         setCountriesList(data);

         if (map.current) return; // initialize map only once
         map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mikecpimentel/cl2d665uz005715lm525x2n09",
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
            map.current.addSource("route", {
               type: "geojson",
               data: route,
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
                     0,
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
                  "line-color": "#FFCF00",
                  "line-width": [
                     "case",
                     [
                        "any",
                        ["boolean", ["feature-state", "list_1"], false],
                        ["boolean", ["feature-state", "hover"], false],
                     ],
                     3,
                     0,
                  ],
               },
            });
            map.current.addLayer({
               id: "route",
               source: "route",
               type: "line",
               paint: {
                  "line-width": 5,
                  "line-color": "#1B998B",
               },
            });
            map.current.addControl(
               new MapboxGeocoder({
                  accessToken: mapboxgl.accessToken,
                  mapboxgl: mapboxgl,
                  externalGeocoder: (...args) => console.log(args),
               }).on("result", (result) => setCurrentPoint(result)),
               "top-left"
            );
            map.current.addControl(
               new mapboxgl.NavigationControl(),
               "bottom-left"
            );
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
            setMapLoaded(true);
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
         {countriesList && mapLoaded && (
            <>
               <div className="sidebar">
                  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
               </div>
               <MainOverlay
                  data={countriesList}
                  handleDeleteButton={handleDeleteButton}
                  map={map}
                  currentPoint={currentPoint ? currentPoint : false}
               />
            </>
         )}
      </>
   );
};
