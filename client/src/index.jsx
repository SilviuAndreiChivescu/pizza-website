import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// I deleted procfile since on the article it says if there is no procfiler, heroku looks for start script in package.json, so I have one

// Html lang tag set it to ro and then check if it translates ok to eng for my portf
// also check what this lang does

// DO font families with bi

// Check if there are npm modules unused and uninstall them

ReactDOM.render(
  <Auth0Provider
    domain="dev-6rdeed8o.eu.auth0.com"
    clientId="10Iwn9shn6ROfe3HTASmfmvDJ5l5QHEz"
    redirectUri={"https://pizza-website2021.herokuapp.com/"}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

export default App;
