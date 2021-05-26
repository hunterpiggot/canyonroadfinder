# Canyon Road Finder
Link: https://amazing-bohr-8a19a7.netlify.app/

## Overview

This application allows users to find and get information about canyon roads around them. The user can find them on a map or can view a list of all the roads around them. The user can also favorite, plan, or mark a road as driven. They can then view all of their marked roads in their separate categories. Users can also leave reviews on roads.

### Features
 - Using a map to view highlighted roads
 - Viewing a list of all canyon roads
 - Marking a road as a "Favorite", "Driven", and "Planned"
 - View all marked roads
 - View road information such as length, elevation change, users average overall and difficulty rating
 - Allow users to leave reviews for roads

### User Flow
  The user will start at the roadlist page. This page will show all roads added to the application. A user can click on a page and view where the road is on a map and learn information about it. The road also has a more in depth description and overview of the road and what to expect. On this page, if the user hasn't left a review yet, they are able to leave one which will allow them to write a description and leave an overall and difficulty rating. On the Navbar, the user can click the Map page. This will show them a map of and has all of the roads highlighted. If the user has allowed my application to use their location, the center of the map will be where they are. If the user has not logged in yet, the top right of the Navbar will have 2 tabs. One for login and one for signing up. These two tabs do exactly what you expect. When the user submits this form, they are redirected to the roadlist page. When the user is logged in the Navbar will have a logout tab and the user's email. If the user wants to logout, they just click that tab and will be redirected to the roadlist page. If the user wants to see their profile they can by clicking their email. This page shows their information and all of the roads they have liked, planned or driven. They can sort by these three categories. Here they, just like the road list and road description page, edit what their road tags are.
  
### API
   - https://developers.google.com/maps

### Technology Stack
 - googlemaps/js-api-loader
 - react-google-maps/api
 - testing-library/jest-dom
 - testing-library/react
 - testing-library/user-event
 - axios
 - bootstrap
 - react
 - react-bootstrap
 - react-dom
 - react-router
 - react-router-dom
 - react-scripts
 - web-vitals

