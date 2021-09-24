import { useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { Card } from "react-bootstrap";
import { useTotalQuantityOrTotalPrice } from "../../AppLogic";
import Details from "../../shared components/Details";
import MyNavbar from "../../shared components/MyNavbar";

import SuccessMessage from "./SuccessMessage";

export default function ReceiptPage(props) {
  const { lastOrder, setLastOrder, setNoCartAnimation } = props;

  // Total price of order
  const { totalPrice } = useTotalQuantityOrTotalPrice(lastOrder);

  // Calculate delivery time
  const [time] = useState(() => new Date());
  // Adds 50 minutes to current time
  const [timeOfDelivery] = useState(
    () => new Date(time.getTime() + 50 * 60000)
  );

  // Before unload, setLastOrder to empty array
  useBeforeunload(() => setLastOrder([]));

  // If page refresh after seeing the receipt or going to path '/receipt' without ordering, redirect to '/' - home page
  if (lastOrder.length === 0) window.location.replace("/");
  else {
    return (
      <main className="slide-in-right">
        <MyNavbar
          setAnimation={setNoCartAnimation}
          title={"Receipt"}
          to={"/"}
        />
        <SuccessMessage />
        <Details title={"Order details"} cart={lastOrder}>
          <Card.Body>
            Date: {time.toLocaleString("ro-RO")} <br></br>
            Date and delivery hour: {timeOfDelivery.toLocaleString(
              "ro-RO"
            )}{" "}
            <br></br>
            Total: <strong>&#163; {totalPrice}</strong>
          </Card.Body>
        </Details>
      </main>
    );
  }
}
