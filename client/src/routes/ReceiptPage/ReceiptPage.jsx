import { useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { Card } from "react-bootstrap";
import { useTotalNoOfProductAndTotalPrice } from "../../AppLogic";
import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";

import SuccessMessage from "./SuccessMessage";

export default function ReceiptPage(props) {
  const { lastOrder, setLastOrder, setNoCartAnimation } = props;

  // Total price of order
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(lastOrder);

  // Calculate delivery time
  const [time] = useState(() => new Date());
  // Adds 50 minutes to current time
  const [timeOfDelivery] = useState(
    () => new Date(time.getTime() + 50 * 60000)
  );

  // Before unload, setLastOrder to empty array
  useBeforeunload(() => setLastOrder([]));

  // If pressing refresh after seeing receipt or going to path '/receipt' without ordering, redirect to '/' - home page
  if (!lastOrder) window.location.replace("http://localhost:3000/");
  else {
    return (
      <main className="page slide-in-right">
        <NavBar setAnimation={setNoCartAnimation} title={"Bon"} to={"/"} />
        <SuccessMessage />
        <Details title={"Detalii comanda"} cart={lastOrder}>
          <Card.Body>
            Data: {time.toLocaleString("ro-RO")} <br></br>
            Data si ora livrarii: {timeOfDelivery.toLocaleString("ro-RO")}{" "}
            <br></br>
            Total: <strong>{totalPrice}</strong> lei
          </Card.Body>
        </Details>
      </main>
    );
  }
}
