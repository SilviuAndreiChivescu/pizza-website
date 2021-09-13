import { useBeforeunload } from "react-beforeunload";
import { useTotalNoOfProductAndTotalPrice } from "../../AppLogic";
import Details from "../../shared components/Details";

export default function ReceiptPage(props) {
  const { lastOrder, lastOrderTime } = props;
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(lastOrder);

  // If pressing refresh after seeing receipt or going to path '/receipt' without ordering, redirect to '/' - home page
  if (!lastOrderTime) window.location.replace("http://localhost:3000/");
  else {
    return (
      <main className="page slide-in-right">
        <h1>Receipt page</h1>
        <Details
          title={"Detalii comanda"}
          cart={lastOrder}
          totalPrice={totalPrice}
        >
          <p>Data: {lastOrderTime}</p>
        </Details>
      </main>
    );
  }
}
