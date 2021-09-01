import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Drawer(props) {
  const { setPageState } = props;
  // **** Authentification dependent ****
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  // If user is logged in
  const LoggedIN = () => {
    // My account button
    const MyAccount = () => {
      return (
        <ListItem
          onClick={() => setPageState("MyAccount")}
          button
          key="MyAccount"
        >
          <ListItemText primary="Contul meu" />
        </ListItem>
      );
    };

    // History button
    const History = () => {
      return (
        <ListItem onClick={() => setPageState("History")} button key="History">
          <ListItemText primary="Comenzile mele" />
        </ListItem>
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
  const [state, setState] = React.useState({ right: false });

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
        <ListItem button key="Termeni si conditii">
          <ListItemText primary="Termeni si conditii" />
        </ListItem>
        <ListItem button key="ANPC">
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
