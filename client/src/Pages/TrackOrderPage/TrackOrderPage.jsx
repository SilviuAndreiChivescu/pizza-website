import { useTotalNoOfProductAndTotalPrice } from "../../routes/MainLogic";
import Details from "../../shared components/Details";
import { useOrder } from "./TrackOrderPageLogic";

export default function TrackOrderPage(props) {
  const { cart, idOfOrder } = props;
  const { order, loaded } = useOrder(idOfOrder);

  if (loaded) {
    return (
      <>
        <h1>Track Order page ID OF ORDER IS: {idOfOrder}</h1>
        <h2>
          Cart is:
          {order.map((e, idx) => {
            return <CartBody e={e} />;
          })}
        </h2>
      </>
    );
  } else return null;
}

const CartBody = (props) => {
  const { e } = props;
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(e);
  return (
    <>
      <Details cart={e} totalPrice={totalPrice} />
    </>
  );
};
