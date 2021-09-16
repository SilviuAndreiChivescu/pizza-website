import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Check for all page, how do they work, if they act accordinagly. Troubleshoot the whole site more or less. recheck for everypage the layout for different devices, phones. Use dev tools.

// Check if for each setState I have that depends on the prev value, I have that function call like setState(prevState => prevState + 1)

// Clean index.html
// Delete all non used components & rename all components acordinagly

// Check if there are npm modules unused and uninstall them
// Unit tests?

// more states in the same place that depend on each other, could as well be an object
// const [formData, setFormData] = useState({
//   uuid: '',
//   firstName: '',
//   lastName: '',
//   address1: '',
//   address2: '',
//   address3: '',
//   addressState, ''
// });
// Update it because you are passing too much props and it s not good
// setFormData({ ...formData, lastName: value_of_last_name });

ReactDOM.render(
  <Auth0Provider
    domain="dev-6rdeed8o.eu.auth0.com"
    clientId="10Iwn9shn6ROfe3HTASmfmvDJ5l5QHEz"
    redirectUri="https://hardcore-poincare-73f729.netlify.app/"
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

export default App;
