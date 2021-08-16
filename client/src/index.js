import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Menu, Whoops404, Mysql, MongoDB, Autentificare } from "./pages";

// TODO: 
// File Structure - Routes
// About the cart: Maybe use a state with an json object inside the application to which I add the food, maybe I don't need a db for this, maybe the "cart table" will be updated only at the end(when user press order), and up to that I store it in localStorage if anything
//   Try to make that feature when user adds something in cart from Modal, to get real time updates in the CartNotOpened (maybe with refresh at the begging if can't find something else)
// IN RELATION WITH ABOVE TODO, Dobra said use localStorage for not loggined users and cart table if account & USE ENCRYPT PASSWORD for pass and save only the encryption in the db
// Use Array Destructing when having more props. Do this const {prop1, prop2, prop3} = props. Then u can use prop1 instead of props.prop1
// Make search input for menu after finishing with the db
// Generate pages for the sideNav and put content in them like Privacy policy and termeni si conditii, there is a generator for them; Also do the Forgot password for SignIn component

// FoodBox component maybe delete the ingredients, because they are in the modal anyway
// Clean index.html
// Delete all non used components that were used in the Home page but I deleted it & rename all components acordinagly & make navbar for all pages the same component
// Put image(svg) downloaded from Illustration idk, for Checkout when having food in cart
// Use best practice for fetching with API, make a file where to put the create, get ... and use it by calling that file easily as I have seen in that video "React Interconnection with db"
// Change boostrap 5 with react-bootstrap (Last and if needed)
// Change <a> with <Link> because <a> triggers a refresh page(check if so) and that is not ok with react because it resets states
// Make a loading page
// Redux if needed or Context API
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
  document.getElementById('root')
);

export default App;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
