import { MongoDB } from "./pages";
import Whoops404 from "./routes/Whoops404";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import "./App.css";

// AM RAMASS AICI
// think good about this, why do you think will work
// Make new branch for this
// Deci m-am gandit bine si cred ca pentru ca am incorporat treaba asta cu Routes si App.js, isi da rerender ca cacatu pentru ca se intoarce la cart in afara routes.
// Cred ca ramane sa implementez la loc cu pageState, probabil pentru asta e facut react pe bune, single page app...
// Ai grija cu CSS transition, pt ca e facuta pt routes acu.. nici nu stiu :))

// Animate between Routes
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Pages / Routes
import NoCartPage from "./routes/NoCartPage/NoCartPage";
import CartPage from "./routes/CartPage/CartPage";
import CheckoutPage from "./routes/CheckoutPage/CheckoutPage";
import HistoryPage from "./routes/HistoryPage/HistoryPage";
import ReceiptPage from "./routes/ReceiptPage/ReceiptPage";
import TrackOrderPage from "./routes/TrackOrderPage/TrackOrderPage";
import MyAccountPage from "./routes/MyAccountPage/MyAccountPage";

// Custom hooks to encapsulate code
import {
  useAppState,
  useCart,
  useTotalNoOfProductAndTotalPrice,
  useProductsList,
  useLastOrder,
  useIdOfOrder,
} from "./AppLogic";

import { CircularProgress } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useBeforeunload } from "react-beforeunload";
import { useState } from "react";

export default function App() {
  // State of Application
  const { appState, setAppState } = useAppState();

  // **** Auth0 ****
  const { isLoading } = useAuth0();

  // Taking cart and setCart from useCart hook
  const { cart, setCart } = useCart();

  // Before unload of page, put cart in localStorage && remove cart from localStorage after setting it to the cart state array
  useBeforeunload(
    window.localStorage.removeItem("cart"),
    window.localStorage.setItem("cart", JSON.stringify(cart))
  );

  // Last order for Receipt - MAYBE IMPLEMENT THE idOfOrder functionality to Receipt page as well TODO
  const { lastOrder, setLastOrder, lastOrderTime, setLastOrderTime } =
    useLastOrder();

  // Pass ID to TrackOrderPage
  const { idOfOrder, setIdOfOrder } = useIdOfOrder();

  // state to read/get products from MongoDB products collection
  const { productsList } = useProductsList(setAppState);

  // **** Custom hook to get: total price and total quantity for CartBar and Cart components from NoCartPage ****
  const { totalQuantity, totalPrice } = useTotalNoOfProductAndTotalPrice(cart);

  // const AnimatedSwitch = withRouter(({ location }) => (
  //   <TransitionGroup>
  //     <CSSTransition
  //       key={location.key}
  //       classNames="slide-in-bck-center"
  //       timeout={400}
  //     >
  //       <MyRoutes location={location} />
  //     </CSSTransition>
  //   </TransitionGroup>
  // ));

  // If loading
  if (appState === "loading" || isLoading) return <Loading />;
  // If loaded
  else if (appState === "loaded") {
    return (
      <>
        <Switch>
          {/* NoCartPage */}
          <Route exact path="/">
            <NoCartPage
              cart={cart}
              setCart={setCart}
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              productsList={productsList}
            />
          </Route>

          {/* CartPage */}
          <Route exact path="/cart">
            <CartPage cart={cart} setCart={setCart} totalPrice={totalPrice} />
          </Route>

          {/* CheckoutPage */}
          <Route exact path="/checkout">
            <CheckoutPage
              cart={cart}
              totalPrice={totalPrice}
              setCart={setCart}
              setLastOrder={setLastOrder}
              setLastOrderTime={setLastOrderTime}
            />
          </Route>

          {/* HistoryPage */}
          <Route exact path="/history">
            <HistoryPage setIdOfOrder={setIdOfOrder} />
          </Route>

          {/* MyAccountPage */}
          <Route exact path="/myaccount">
            <MyAccountPage />
          </Route>

          {/* ReceiptPage */}
          <Route exact path="/receipt">
            <ReceiptPage
              lastOrder={lastOrder}
              lastOrderTime={lastOrderTime}
              totalPrice={totalPrice}
            />
          </Route>

          {/* TrackOrderPage */}
          <Route exact path="/trackorder">
            <TrackOrderPage idOfOrder={idOfOrder} />
          </Route>

          <Route exact path="/mongodb">
            <MongoDB />
          </Route>

          {/* Redirect to if not a Route path */}
          <Route path="*">
            <Whoops404 />
          </Route>
        </Switch>
      </>
    );
  }
}

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress disableShrink />
    </div>
  );
};
