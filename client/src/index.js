import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu, Whoops404, Mysql, MongoDB, Autentificare } from "./pages";

// AICI AM RAMAS!!, IN PRIMU RAND, DAI COMMIT PANA SA INCEPI SA INTEGREZI FAZA CU OBIECTU SI LOCAL STORAGE, DAI
// UN COMIT CU NUMELE CA BEFORE IMPLEMENTING OBIECTU SI LOCAL STORAGE !!!
// TODO:
// I

// !!! TO DO FIRST, local storage to store cart items and display them between states at first. Then send it to cart(orders) collection. Add an onclose event to the unload of browser (I have an opened tab on mobile browser)
// IF ABOVE IS GOING OK, AFTER THIS START DOING AUTHENTHIFICATION WITH AUTH0
// TO MANAGE STATE OF THE ENTIRE APP, LOADING ETC -  After all the request do .then or await(check what await does and if it is same as with .then) LOOK AT SS TAKEN

// (THE FOLLOWING WERE FROM BEFORE I SAID I WOULD UPDATE TO JSON OBJECT AS CART AND SEND TO CART COLLECTION AT THE END ALL THE ORDER DATA(ALSO CHANGE CART COLLECTION NAME TO ORDERS))
// set useEffect from pagex.js to listen to show state as well so that when u go back an forth from cart to menu state, to get updated reults
// Make a function that does setTotalPrice and call it from runAll function, maybe it will run at the end. IF NOT, run it with timeout, see if works
// Try making an object with the useState from CartOpen because it might get updated differently
// useReduccer to solve the bug I had with price of product and total price?

// II
// Context api instead of distructering the array with props
// File Structure - Routes ( make folder with name Pages / Routes, and inside it make folder with each page and inside should be "about-us.jsx" , 'abouts-us.css'. You can make a index.js file inside your Pages folder, in which u just import and then export the pages, so it makes routing easier)
// Make validation folder inside client and inside do validation functions to validate password or email or phone number.
// Delete node_modules from github because they are commonly not uploaded to github, due to the package-json file which helps you install when u clone the repo
// Use Array Destructing when having more props. Do this const {prop1, prop2, prop3} = props OR DESTRUCTURE IT INSIDE YOUR FUNCTION (). Then u can use prop1 instead of props.prop1
// Make search input for menu after finishing with the db
// You don't need class components, change them if u have any
// Generate pages for the sideNav and put content in them like Privacy policy and termeni si conditii, there is a generator for them; Also do the Forgot password for SignIn component

// FoodBox component maybe delete the ingredients, because they are in the modal anyway
// Clean index.html
// Delete all non used components that were used in the Home page but I deleted it & rename all components acordinagly & make navbar for all pages the same component
// Put image(svg) downloaded from Illustration idk, for Checkout when having food in cart
// Use best practice for fetching with API, make a file where to put the create, get ... and use it by calling that file easily as I have seen in that video "React Interconnection with db"
// Change boostrap 5 with react-bootstrap (Last and if needed)
// Change <a> with <Link> because <a> triggers a refresh page(check if so) and that is not ok with react because it resets states
// Redux if needed or Context API (seen about it and it is nice)
// Optimize for mobile(maybe bootstrap will do it for me)
// Hide the key for the db as it shoulf if I should
// Unit tests?
// Check if there are npm modules unused and uninstall them

// GOOD TO KNOW

// use useEffect when console.log something that is state depenendent, because it will give you the real time value, not the value that was when you would console.log, because when you would console.log normally, it will run asynch, and you don't want that
// when using setState for let's say, increment by 1, don't just put setCount(count+1), !!put setCount(currCount => currCount + 1)
// ALSO for when toggling from false to true, use setState(currState => !currState)
// When using useEffect and in the dependency array you will put an object, due to referencing of that obj, it might give an unexpected result. SO when using useEffect and want to be dependent of an object, use useMemo() [look it up if needed]
// See if async with await is usefull for this project
// Material UI check
// Cica useEffect daca nu i dai nici un argument, o sa dea run de fiecare data cand un state din componenta respectiva se va schimba.
// using compound components u can pass a state to multiple components
// Switch to TS at some point

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home /> } /> */}
        <Route path="/" element={<Menu />} />
        <Route path="*" element={<Whoops404 />} />
        <Route path="/autentificare" element={<Autentificare />} />
        <Route path="/mysql" element={<Mysql />} />
        <Route path="/mongodb" element={<MongoDB />} />
      </Routes>
    </>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
