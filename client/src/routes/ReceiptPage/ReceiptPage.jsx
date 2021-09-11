import { useTotalNoOfProductAndTotalPrice } from "../../AppLogic";
import Details from "../../shared components/Details";

export default function ReceiptPage(props) {
  const { lastOrder, lastOrderTime } = props;
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(lastOrder);
  return (
    <>
      <h1>Receipt page</h1>
      <Details
        title={"Detalii comanda"}
        cart={lastOrder}
        totalPrice={totalPrice}
      >
        <p>Data: {lastOrderTime}</p>
      </Details>
    </>
  );
}
