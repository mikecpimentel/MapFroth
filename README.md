# MapFroth

MapFroth = Map + [Coffee] Froth, two things that go together nicely.

I love the world and dream of traveling everywhere. I am developing MapFroth to help people like myself plan their next adventures and enable the discovery of interesting destinations.

Tools I've used so far to start MapFroth development:

- **Mapbox** - I designed the static black and white base map on Mapbox using free Mapbox Studio tools.
- **Natural Earth** - Hover overlay boundary data come from publicly available data provided by Natural Earth
- **Aspose GeoJSON converter** - Boundary data from Natural Earth was not in a format usable by Mapbox. I converted the data to GeoJSON with help from the free converter provided by Aspose
- **Auth0** - I use an Auth0 free plan to help with some of the social login integrations (Google and Github OAuth 2.0 authentication). I use the authorization code flow with PKCE (proof key for code exchange) as outlined in the OAuth 2.0 specifications. Communication between the client (this page), the back-end API, the auth providers (Google, Github, etc) and Auth0 servers are all secured with Auth0.
- **Digital Ocean** - Cloud virtual machine. I use Ubuntu 20.04 LTS.
- **VSCode** - Of course

Note: MapFroth is not mobile friendly yet

Tools I've used so far for the front-end:
- React
- JavaScript
- HTML
- CSS
- Mapbox

For the back-end API, I use:
- Node
- Express
- PostgreSQL
- PM2

MapFroth has a dearth of features, but that should soon change with added ...

- **Map Basics** - Map navigation buttons (zoom, pan, rotate), greater interactivity
- **City-Level Planning** - I eliminated city-level map details until I develop more features.
- **Collaboration** - Allow small groups of travelers (friends, a couple, a tech-savvy elderly group of wanderlusting knitters) to be able to plan together.
- **User-Curated Travel Lists** - Users helping users discover places based on their interests or trip goals.
- **Destination Research** - I plan to connect MapFroth to various third-party data providers to add detailed information to the map as well as provide external resource links.
- **Trip Planning** - Flight distances, currency information, user notes, flight prices.
- **Social Sharing** - User location (based on trip itinerary), sync with social sites, share notes, photos between group members and/or the public.
- **Mobile App** - MapFroth should be mobile-friendly.

Disclaimer:

National boundaries are often in dispute and internationally recognized borders are constantly shifting.

Both the underlying map and the overlay are based on boundaries currently recognized by the United States. There exist a few minor inconsistencies between the two layers (e.g. around Morocco and Western Sahara), but I will work to fully reconcile the two layers in the future. The national boundaries in this map are not necessarily indicative of any personal worldview.
