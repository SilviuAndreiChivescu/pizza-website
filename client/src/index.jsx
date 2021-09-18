import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Html lang tag set it to ro and then check if it translates ok to eng for my portf
// also check what this lang does

// DO font families with bi

// do file structure for whole project for deployment, and I think I will deploy it only on heroku all together after I sort it out how to deploy it for cata
// think about this for deploying app on same host, you will need your back end at the top, not in server, in order to deploy it on same host server

// Check if there are npm modules unused and uninstall them

ReactDOM.render(
  <Auth0Provider
    domain="dev-6rdeed8o.eu.auth0.com"
    clientId="10Iwn9shn6ROfe3HTASmfmvDJ5l5QHEz"
    redirectUri="http://localhost:3000"
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

export default App;
