import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Check if there are npm modules unused and uninstall them

// pt portf meu, sa mai sterg din pizze, lasa mai putine doar asa de ex.
// also translate all romanian stuff to english for prtf

// readMe (delete the translate from romania stuff, maybe rewrite it to translate the products if you'd like)
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
