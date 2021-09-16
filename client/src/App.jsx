import { Route, Switch } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Pages / Routes
import NoCartPage from "./routes/NoCartPage/NoCartPage";
import CartPage from "./routes/CartPage/CartPage";
import CheckoutPage from "./routes/CheckoutPage/CheckoutPage";
import HistoryPage from "./routes/HistoryPage/HistoryPage";
import ReceiptPage from "./routes/ReceiptPage/ReceiptPage";
import TrackOrderPage from "./routes/TrackOrderPage/TrackOrderPage";
import MyAccountPage from "./routes/MyAccountPage/MyAccountPage";
import PrivacyPolicyPage from "./routes/PrivacyPolicyPage";
import TermsPage from "./routes/TermsPage";
import Whoops404 from "./routes/Whoops404";

// Logic
import { useTotalQuantityOrTotalPrice, useProductsList } from "./AppLogic";

import { CircularProgress } from "@material-ui/core";
import "./App.css";

export default function App() {
  // State of Application
  const [appState, setAppState] = useState("loading");

  // **** Auth0 ****
  const { isLoading } = useAuth0();

  // Cart state to store products
  // Initiate cart with previous cart from localStorage if exists else empty array
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart")) || []
  );

  // Before unload of page, put cart in localStorage && remove cart from localStorage after setting it to the cart state array
  useBeforeunload(
    window.localStorage.removeItem("cart"),
    window.localStorage.setItem("cart", JSON.stringify(cart))
  );

  // Last order is used to show on Receipt
  const [lastOrder, setLastOrder] = useState([]);

  // State to pass id of order to TrackOrderPage
  const [idOfOrder, setIdOfOrder] = useState("");

  // state to read/get products from MongoDB products collection
  const { productsList } = useProductsList(setAppState);

  // **** Custom hook to get: total price and total quantity for CartBar and Cart components from NoCartPage ****
  const { totalQuantity, totalPrice } = useTotalQuantityOrTotalPrice(cart);

  // Animations for Routes
  const [noCartAnimation, setNoCartAnimation] = useState("scale-in-center");
  const [cartAnimation, setCartAnimation] = useState("slide-in-bottom");

  // If loading
  if (appState === "loading" || isLoading) return <Loading />;
  // If error
  if (appState === "error")
    return <h1>Este o eroare. Va rugam reincercati.</h1>;
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
              noCartAnimation={noCartAnimation}
              setCartAnimation={setCartAnimation}
            />
          </Route>

          {/* CartPage */}
          <Route exact path="/cart">
            <CartPage
              cart={cart}
              setCart={setCart}
              totalPrice={totalPrice}
              cartAnimation={cartAnimation}
              setNoCartAnimation={setNoCartAnimation}
            />
          </Route>

          {/* CheckoutPage */}
          <Route exact path="/checkout">
            <CheckoutPage
              setAppState={setAppState}
              cart={cart}
              totalPrice={totalPrice}
              setCart={setCart}
              setLastOrder={setLastOrder}
              setCartAnimation={setCartAnimation}
            />
          </Route>

          {/* ReceiptPage */}
          <Route exact path="/receipt">
            <ReceiptPage
              lastOrder={lastOrder}
              setLastOrder={setLastOrder}
              totalPrice={totalPrice}
              setNoCartAnimation={setNoCartAnimation}
            />
          </Route>

          {/* HistoryPage */}
          <Route exact path="/history">
            <HistoryPage
              setAppState={setAppState}
              setIdOfOrder={setIdOfOrder}
              setNoCartAnimation={setNoCartAnimation}
            />
          </Route>

          {/* TrackOrderPage */}
          <Route exact path="/trackorder">
            <TrackOrderPage
              setAppState={setAppState}
              idOfOrder={idOfOrder}
              setNoCartAnimation={setNoCartAnimation}
            />
          </Route>

          {/* MyAccountPage */}
          <Route exact path="/myaccount">
            <MyAccountPage
              setAppState={setAppState}
              setNoCartAnimation={setNoCartAnimation}
            />
          </Route>

          {/* Privacy Policy Page */}
          <Route exact path="/privacypolicy">
            <PrivacyPolicyPage />
          </Route>

          {/* Terms Page */}
          <Route exact path="/terms">
            <TermsPage />
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
