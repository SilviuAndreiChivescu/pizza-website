import { useState } from "react";
import { useTotalNoOfProductAndTotalPrice } from "../../routes/MainLogic";
import Details from "../../shared components/Details";
import { useDate, useOrder } from "./TrackOrderPageLogic";

// AICI AM RAMAS Mai fa UI la pagina asta,
export default function TrackOrderPage(props) {
  const { idOfOrder } = props;
  const { order, loaded } = useOrder(idOfOrder);

  const { minsDiff } = useDate(idOfOrder);
  // AM RAMAS AICI, AM LUAT MINUTES DIFFERENCE, NOW DO THE REACT THING, MAKE STATE, PUT IN THAT STATE THE RESULT, AND DO THE LOGIC IF THE STATE IS > 50, SHOW COMANDA TA A FOST LUATA, ELSE ...

  if (loaded) {
    return (
      <>
        <h1>Track Order page ID OF ORDER IS: {idOfOrder}</h1>
        <h1>Date of this order is: </h1>
        <h1>Minutes difference {minsDiff}</h1>
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
