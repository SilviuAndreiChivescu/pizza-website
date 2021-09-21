import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// DO NOT DELETE ANYTHING FOR CATA'S WEBSITE UNTIL HIS ASSOCIATE SEES THIS SITE IN RO AND EVERYTHING

// Check if there are npm modules unused and uninstall them BEFORE YOU MAKE A REPO FOR CATA

// pt portf meu, sa mai sterg din pizze, lasa mai putine doar asa de ex.
// also translate all romanian stuff to english for prtf
// also delete the links to terms and to privacy policy and ANCP

// readMe (delete the translate from romania stuff, maybe rewrite it to translate the products if you'd like), mention to put images in public/images
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENTID}
    redirectUri={process.env.REACT_APP_FRONTEND}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

export default App;
