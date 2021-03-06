import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useAuth0 } from "@auth0/auth0-react";

import { Link, useHistory } from "react-router-dom";
// The Delay Link is used so that the animations don't interfere with each other
const DelayLink = ({ to, children, delay }) => {
  const history = useHistory();

  function delayAndGo(e) {
    e.preventDefault();

    setTimeout(() => history.push(to), delay);
  }

  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={to}
      onClick={delayAndGo}
    >
      {children}
    </Link>
  );
};

export default function Drawer(props) {
  // **** Authentification dependent ****
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

  // If user is logged in
  const LoggedIN = () => {
    const Admin = () => {
      if (process.env.REACT_APP_ADMINS.split(" ").includes(user.email)) {
        return (
          <DelayLink to="/admin" delay={300}>
            <ListItem button key="Admin Page">
              <ListItemText primary="Admin Page" />
            </ListItem>
          </DelayLink>
        );
      }
      return null;
    };

    // My account button
    const MyAccount = () => {
      return (
        <DelayLink to="/myaccount" delay={300}>
          <ListItem button key="MyAccount">
            <ListItemText primary="My Account" />
          </ListItem>
        </DelayLink>
      );
    };

    // History button
    const History = () => {
      return (
        <DelayLink to="/history" delay={300}>
          <ListItem button key="History">
            <ListItemText primary="My Orders" />
          </ListItem>
        </DelayLink>
      );
    };

    return (
      <>
        <Admin />
        <MyAccount />
        <History />
      </>
    );
  };
  // Logout button
  const LogOut = () => {
    return (
      <ListItem
        button
        key="Log Out"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <ListItemText primary="Log out" />
      </ListItem>
    );
  };

  // If user is NOT logged in
  const NotLoggedIn = () => {
    // Log in button
    const LogIn = () => {
      return (
        <ListItem onClick={() => loginWithRedirect()} button key="Log In">
          <ListItemText primary="Log in" />
        </ListItem>
      );
    };

    return (
      <>
        <LogIn />
      </>
    );
  };
  // **** END Authentification dependent ****

  // **** Drawer functionality ****
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className="mt-4 ms-3 me-3"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* Rendering different depending on the user's authentification */}
        {isAuthenticated ? <LoggedIN /> : <NotLoggedIn />}
        <ListItem button key="Privacy Policy">
          <ListItemText primary="Privacy Policy" />
        </ListItem>
        <ListItem button key="Terms and Conditions">
          <ListItemText primary="Terms and Conditions" />
        </ListItem>

        <ListItem button key="ANPC">
          <ListItemText primary="ANPC" />
        </ListItem>
        {isAuthenticated ? <LogOut /> : null}
      </List>
    </div>
  );

  return (
    <React.Fragment key={"right"}>
      <Button
        onClick={toggleDrawer("right", true)}
        aria-label="Side Navigation"
      >
        {props.Icon}
      </Button>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
