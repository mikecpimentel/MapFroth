import {
   Paper,
   Accordion,
   AccordionSummary,
   AccordionDetails,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginInfo } from "./LoginInfo";
import { CusAccordion } from "./CusAccordion";
import { CountryAccordion } from "./CountryAccordion";
import LogoutButton from "../logout";
import LoginButton from "../login";

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

const data = [
   {
      summary: "Disclaimer",
      details:
         "Because of the frequently-shifting nature of national boundaries, a few small . Many .. When offered a choice, I use the United States worldview of national boundaries. For example, my background map suggests a disputed separation between Morocco and Western Sahara, but my hover overlay is slightly out of date when it comes to recognizing a separation between the two regions.",
   },
   {
      summary: "Sources",
      details:
         "Data for Mapfroth come from publicly available or . I designed the static black and white base map on Mapbox using free Mapbox Studio tools. Hover overlay boundary data come from publicly available data provided by Natural Earth.",
   },
   {
      summary: "Tools",
      details:
         " Aspose's free online GeoJSON converter. I used this tool to help me convert Natural Earth data into GeoJSON data that Mapbox can use. https://www.naturalearthdata.com/downloads/10m-cultural-vectors/ , https://products.aspose.app/gis/en/conversion/convert-to-geojson",
   },
   {
      summary: "Planned Features",
      details:
         "Shrink the world. placeholder. flight distance. currency info. connect to tripadvisor api. make adventuring as easy as possible. average flight costs by month. take notes for each location. share plans. share locations and notes on the map if traveling with a group. list names. list colors. focus on cities, airport and destinations. user-curated themed lists (nature . One interesting challenge was automatically connecting a user's accounts, regardless of which oauth user they chose to use, as long as their email address remained the same. I was also very careful about the security aspect of everything I was doing.",
   },
   {
      summary: "Settings",
      details: "dfd",
   },
];

//
/*

         */

const MainOverlay = (props) => {
   const { user, isAuthenticated } = useAuth0();

   return (
      <div style={{ zIndex: 5 }} id="main-overlay">
         <Paper>
            <img id="profile-photo" src={user.picture} alt="profile-owner" />
            <LoginInfo />
         </Paper>
         <div
            className="country-accordion-wrapper"
            style={{ marginTop: "25px", backgroundColor: "#0000" }}
         >
            {props.data.map((item) => (
               <CountryAccordion data={item} />
            ))}
         </div>
         <div className="info-accordion-wrapper">
            {data.map((item) => (
               <CusAccordion data={item} />
            ))}
         </div>
         <Paper sx={{ marginTop: "10px" }}>
            <Accordion>
               <AccordionSummary>Settings</AccordionSummary>
               <AccordionDetails>
                  {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                  <p>Email: {user.email}</p>
               </AccordionDetails>
            </Accordion>
         </Paper>
      </div>
   );
};

export default MainOverlay;
