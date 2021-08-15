import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  
  export default function Drawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({right: false});
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
            <ListItem component={Link} to="/autentificare" button key="Autentificare">
              <ListItemText primary="Autentificare" />
            </ListItem>
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
          <React.Fragment key={'right'}>
            <Button onClick={toggleDrawer('right', true)}>{props.Icon}</Button>
            <SwipeableDrawer
              anchor={'right'}
              open={state['right']}
              onClose={toggleDrawer('right', false)}
              onOpen={toggleDrawer('right', true)}
            >
              {list('right')}
            </SwipeableDrawer>
          </React.Fragment>
    );
  }