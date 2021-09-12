import { MongoDB } from "./pages";
import Whoops404 from "./routes/Whoops404";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";

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

  // Animation between Routes
  const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Switch location={location}>
          <MyRoutes />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ));

  // MyRoutes
  const MyRoutes = () => {
    return (
      <>
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
        <Route path="/cart">
          <CartPage cart={cart} setCart={setCart} totalPrice={totalPrice} />
        </Route>

        {/* CheckoutPage */}
        <Route path="/checkout">
          <CheckoutPage
            cart={cart}
            totalPrice={totalPrice}
            setCart={setCart}
            setLastOrder={setLastOrder}
            setLastOrderTime={setLastOrderTime}
          />
        </Route>

        {/* HistoryPage */}
        <Route path="/history">
          <HistoryPage setIdOfOrder={setIdOfOrder} />
        </Route>

        {/* MyAccountPage */}
        <Route path="/myaccount">
          <MyAccountPage />
        </Route>

        {/* ReceiptPage */}
        <Route path="/receipt">
          <ReceiptPage
            lastOrder={lastOrder}
            lastOrderTime={lastOrderTime}
            totalPrice={totalPrice}
          />
        </Route>

        {/* TrackOrderPage */}
        <Route path="/trackorder">
          <TrackOrderPage idOfOrder={idOfOrder} />
        </Route>

        {/* Redirect to if not a Route path */}
        <Route path="*">
          <Whoops404 />
        </Route>

        <Route path="/mongodb">
          <MongoDB />
        </Route>
      </>
    );
  };

  // If loading
  if (appState === "loading" || isLoading) return <Loading />;
  // If loaded
  else if (appState === "loaded") {
    return (
      <>
        <AnimatedSwitch />
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
