import {
   Paper,
   Accordion,
   AccordionSummary,
   AccordionDetails,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { CountryAccordion } from "./CountryAccordion";
import LogoutButton from "../logout";
import LoginButton from "../login";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TripsSection } from "./TripsSection";

const MainOverlay = (props) => {
   const { user, isAuthenticated } = useAuth0();

   return (
      <div style={{ zIndex: 5 }} id="main-overlay">
         <Paper sx={{ padding: "8px" }}>
            <img id="profile-photo" src={user.picture} alt="profile-owner" />
         </Paper>
         <div
            className="country-accordion-wrapper"
            style={{ marginTop: "15px", backgroundColor: "#0000" }}
         >
            {props.data.length > 0 ? (
               props.data.map((item) => (
                  <CountryAccordion
                     key={item.country_id}
                     data={item}
                     handleDeleteButton={props.handleDeleteButton}
                  />
               ))
            ) : (
               <Paper sx={{ padding: "20px" }}>
                  Try clicking on a few countries. You can zoom in using your
                  mouse touchpad or mouse wheel. Changes are saved across
                  devices.
               </Paper>
            )}
         </div>
         <div className="info-accordion-wrapper">
            <Accordion className="info-accordion">
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="summary"
               >
                  About
               </AccordionSummary>
               <AccordionDetails>
                  <p>
                     MapFroth = Map + [Coffee] Froth, two things that go
                     together nicely.
                  </p>
                  <p>
                     I love the world and dream of traveling everywhere. I am
                     developing MapFroth to help people like myself plan their
                     next adventures and enable the discovery of interesting
                     destinations.
                  </p>
                  <p>Tools I've used so far to start MapFroth development:</p>
                  <ul className="detailed-list">
                     <li>
                        <span>Mapbox</span> - I designed the static black and
                        white base map on Mapbox using free Mapbox Studio tools.
                     </li>
                     <li>
                        <span>Natural Earth</span> - Hover overlay boundary data
                        come from publicly available data provided by Natural
                        Earth (
                        <a
                           href="https://www.naturalearthdata.com/downloads/10m-cultural-vectors/"
                           target="_blank"
                           rel="noreferrer"
                        >
                           link
                        </a>
                        )
                     </li>
                     <li>
                        <span>Aspose GeoJSON converter</span> - Boundary data
                        from Natural Earth was not in a format usable by Mapbox.
                        I converted the data to GeoJSON with help from the free
                        converter provided by Aspose (
                        <a
                           href="https://products.aspose.app/gis/en/conversion/convert-to-geojson"
                           target="_blank"
                           rel="noreferrer"
                        >
                           link
                        </a>
                        )
                     </li>
                     <li>
                        <span>Auth0</span> - I use an Auth0 free plan to help
                        with some of the social login integrations (Google and
                        Github OAuth 2.0 authentication). I use the
                        authorization code flow with PKCE (proof key for code
                        exchange) as outlined in the OAuth 2.0 specifications (
                        <a
                           href="https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce"
                           target="_blank"
                           rel="noreferrer"
                        >
                           link 1
                        </a>
                        ,{" "}
                        <a
                           href="https://datatracker.ietf.org/doc/html/rfc7636"
                           target="_blank"
                           rel="noreferrer"
                        >
                           link 2
                        </a>
                        ). Communication between the client (this page), the
                        back-end API, the auth providers (Google, Github, etc)
                        and Auth0 servers are all secured with Auth0.
                     </li>
                     <li>
                        <span>Digital Ocean</span> - Cloud virtual machine (
                        <a
                           href="https://www.digitalocean.com/products/droplets"
                           target="_blank"
                           rel="noreferrer"
                        >
                           link
                        </a>
                        ). I use Ubuntu 20.04 LTS.
                     </li>
                  </ul>
                  <p>On the front-end, MapFroth is built with: </p>
                  <ul className="short-list">
                     <li>React</li>
                     <li>React Router</li>
                     <li>
                        mapbox-gl (
                        <a
                           href="https://docs.mapbox.com/mapbox-gl-js/api/"
                           target="_blank"
                           rel="noreferrer"
                        >
                           link
                        </a>
                        )
                     </li>
                  </ul>
                  <p>For the back-end API, I use:</p>
                  <ul className="short-list">
                     <li>Node</li>
                     <li>Express</li>
                     <li>PostgreSQL</li>
                     <li>PM2 (Node process manager)</li>
                  </ul>
               </AccordionDetails>
            </Accordion>
            <Accordion className="info-accordion">
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="summary"
               >
                  Planned Features
               </AccordionSummary>
               <AccordionDetails>
                  <p>
                     MapFroth has a dearth of features, but that should soon
                     change with added ...
                  </p>
                  <ul className="detailed-list">
                     <li>
                        <span>Map Basics</span> - Map navigation buttons (zoom,
                        pan, rotate), greater interactivity
                     </li>
                     <li>
                        <span>City-Level Planning</span> - I eliminated
                        city-level map details until I develop more features.
                     </li>
                     <li>
                        <span>Collaboration</span> - Allow small groups of
                        travelers (friends, a couple, a tech-savvy elderly group
                        of wanderlusting knitters) to be able to plan together.
                     </li>
                     <li>
                        <span>User-Curated Travel Lists</span> - Users helping
                        users discover places based on their interests or trip
                        goals.
                     </li>
                     <li>
                        <span>Destination Research</span> - I plan to connect
                        MapFroth to various third-party data providers to add
                        detailed information to the map as well as provide
                        external resource links.
                     </li>
                     <li>
                        <span>Trip Planning</span> - Flight distances, currency
                        information, user notes, flight prices.
                     </li>
                     <li>
                        <span>Social Sharing</span> - User location (based on
                        trip itinerary), sync with social sites, share notes,
                        photos between group members and/or the public.
                     </li>
                     <li>
                        <span>Mobile App</span> - MapFroth should be
                        mobile-friendly.
                     </li>
                  </ul>
               </AccordionDetails>
            </Accordion>

            <Accordion className="info-accordion">
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="summary"
               >
                  Disclaimer
               </AccordionSummary>
               <AccordionDetails>
                  <p>
                     National boundaries are often in dispute and
                     internationally recognized borders are constantly shifting.
                  </p>
                  <p>
                     Both the underlying map and the overlay are based on
                     boundaries currently recognized by the United States. There
                     exist a few minor inconsistencies between the two layers
                     (e.g. around Morocco and Western Sahara), but I will work
                     to fully reconcile the two layers in the future. The
                     national boundaries in this map are not necessarily
                     indicative of any personal worldview.
                  </p>
               </AccordionDetails>
            </Accordion>
            <Accordion className="info-accordion">
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="summary"
               >
                  Settings
               </AccordionSummary>
               <AccordionDetails>
                  {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                  <p>Email: {user.email}</p>
               </AccordionDetails>
            </Accordion>
         </div>
         <TripsSection map={props.map} currentPoint={props.currentPoint} />
      </div>
   );
};

export default MainOverlay;
