import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useAuth0 } from "@auth0/auth0-react";

// The Delay Link is used so that the animations don't interfere with each other
import { Link, useHistory } from "react-router-dom";
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
            <ListItemText primary="Contul meu" />
          </ListItem>
        </DelayLink>
      );
    };

    // History button
    const History = () => {
      return (
        <DelayLink to="/history" delay={300}>
          <ListItem button key="History">
            <ListItemText primary="Comenzile mele" />
          </ListItem>
        </DelayLink>
      );
    };
    // LogOut button
    const LogOut = () => {
      return (
        <ListItem
          button
          key="Log Out"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          <ListItemText primary="Deconecteaza-te" />
        </ListItem>
      );
    };

    return (
      <>
        <Admin />
        <MyAccount />
        <History />
        <LogOut />
      </>
    );
  };

  // If user is NOT logged in
  const NotLoggedIn = () => {
    // Log in button
    const LogIn = () => {
      return (
        <ListItem onClick={() => loginWithRedirect()} button key="Log In">
          <ListItemText primary="Autentificare" />
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
        <DelayLink to="/privacypolicy" delay={300}>
          <ListItem button key="Privacy Policy">
            <ListItemText primary="Privacy Policy" />
          </ListItem>
        </DelayLink>
        <DelayLink to="/terms" delay={300}>
          <ListItem button key="Termeni si conditii">
            <ListItemText primary="Termeni si conditii" />
          </ListItem>
        </DelayLink>

        <ListItem
          component="a"
          style={{ textDecoration: "none", color: "inherit" }}
          href="https://anpc.ro/"
          target="_blank"
          rel="noreferrer"
          button
          key="ANPC"
        >
          <ListItemText primary="ANPC" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <React.Fragment key={"right"}>
      <Button onClick={toggleDrawer("right", true)}>{props.Icon}</Button>
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
