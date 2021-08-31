import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MongoDB } from "./pages";
import Main from "./Routes/Main";
import Whoops404 from "./Routes/Whoops404";
import { Auth0Provider } from "@auth0/auth0-react";

// TODO:

// plan for things MAIU sent pic on whatsapp from diniasi after taking the order and for every pic. Think it good and make a plan to integrate them in order and to do it properly
// Think about users collection, how and when will I be getting the data and enter it into my users collection

// Generate pages for the sideNav and put content in them like Privacy policy and termeni si conditii, there is a generator for them;

// TO MANAGE STATE OF THE ENTIRE APP, LOADING ETC -  After all the request do .then or await(check what await does and if it is same as with .then) LOOK AT SS TAKEN
// DELETE pages.js, now is just my mongoDB route from which I get directions to build the rest of the App

// Design History component

// II
// Make search input for menu after finishing with the db
// Put image(svg) downloaded from Illustration idk, for Checkout when having food in cart
// FoodBox component maybe delete the ingredients, because they are in the modal anyway
// Optimize for mobile(maybe bootstrap will do it for me)
// Drawer component is in shared components folder, but it's used only by NavBar which is also in shared components. Think this through
// You don't need class components, change them if u have any
// Check if for each setState I have that depends on the prev value, I have that function call like setState(prevState => prevState + 1)
// Use lazy initiator for useState hooks if u initiate it to a function. If not, that function will be called everytime the state updates(see ss taken on phone)

// Use best practice for fetching with API, make a file where to put the create, get ... and use it by calling that file easily as I have seen in that video "React Interconnection with db"
// Hide the key for the db as it shoulf if I should
// Change boostrap 5 with react-bootstrap (Last and if needed) & Semantic UI
// Redux(read a lot about this and I think i fit in the situation where I don't really need it in my App, this might change later)
// Clean index.html
// Delete all non used components & rename all components acordinagly

// Check if there are npm modules unused and uninstall them
// Unit tests?

// GOOD TO KNOW
// Contex.API it's ok only if using a context sharing a single value only due to re rendering, see if it may be helpful down the project
// when using setState for let's say, increment by 1, don't just put setCount(count+1), !!put setCount(currCount => currCount + 1)
// ALSO for when toggling from false to true, use setState(currState => !currState)
// When using useEffect and in the dependency array you will put an object, due to referencing of that obj, it might give an unexpected result. SO when using useEffect and want to be dependent of an object, use useMemo() [look it up if needed]
// Cica useEffect daca nu i dai nici un argument, o sa dea run de fiecare data cand un state din componenta respectiva se va schimba.
// <React.strictmode> makes ur code render two times at the begging
// TS is very good for maintaining application and is not too much to learn

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Whoops404 />} />
        <Route path="/mongodb" element={<MongoDB />} />
      </Routes>
    </>
  );
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-6rdeed8o.eu.auth0.com"
    clientId="10Iwn9shn6ROfe3HTASmfmvDJ5l5QHEz"
    redirectUri="http://localhost:3000/"
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);

export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals