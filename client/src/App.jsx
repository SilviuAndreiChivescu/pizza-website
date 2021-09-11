import { MongoDB } from "./pages";
import Whoops404 from "./routes/Whoops404";
import { Routes, Route } from "react-router-dom";

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

  if (appState === "loading" || isLoading) return <Loading />;
  else if (appState === "loaded") {
    return (
      <>
        <Routes>
          <Route
            path="/"
            element={
              <NoCartPage
                cart={cart}
                setCart={setCart}
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
                productsList={productsList}
              />
            }
          />
          {/* CartPage */}
          <Route
            path="/cart"
            element={
              <CartPage cart={cart} setCart={setCart} totalPrice={totalPrice} />
            }
          />
          {/* CheckoutPage */}
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cart={cart}
                totalPrice={totalPrice}
                setCart={setCart}
                setLastOrder={setLastOrder}
                setLastOrderTime={setLastOrderTime}
              />
            }
          />
          {/* HistoryPage */}
          <Route
            path="/history"
            element={<HistoryPage setIdOfOrder={setIdOfOrder} />}
          />
          {/* MyAccountPage */}
          <Route path="/myaccount" element={<MyAccountPage />} />
          {/* ReceiptPage */}
          <Route
            path="/receipt"
            element={
              <ReceiptPage
                lastOrder={lastOrder}
                lastOrderTime={lastOrderTime}
                totalPrice={totalPrice}
              />
            }
          />
          {/* TrackOrderPage */}
          <Route
            path="/trackorder"
            element={<TrackOrderPage idOfOrder={idOfOrder} />}
          />
          {/* Redirect to if not a Route path */}
          <Route path="*" element={<Whoops404 />} />
          <Route path="/mongodb" element={<MongoDB />} />
        </Routes>
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
