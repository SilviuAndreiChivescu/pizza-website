import { useTotalNoOfProductAndTotalPrice } from "../../routes/MainLogic";
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
        <p>Se va livra in: 50 minute.</p>
      </Details>
    </>
  );
}
