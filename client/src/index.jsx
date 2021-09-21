import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Check if there are npm modules unused and uninstall them

// pt portf meu, sa mai sterg din pizze, lasa mai putine. Also think what other things there are, like making for cata all his account and his db, to not be bothered to not delete stuff.
// also translate all romanian stuff to english for prtf

// AM RAMAS AICI, MAI GANDESTE TE DACA MAI TRB FACUT CEVA LA ADMIN FUNCITONALITY ASTA, DACA E GATA, POTI SA II DAI MERGE LA DEV SI POATE DUPA SI LA MASTER
// test receipt and adminpage online, see if they redirect how they should to home page since i changed the env var from link to '/'

// readMe
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
