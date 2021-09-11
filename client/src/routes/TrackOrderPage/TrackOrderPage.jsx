import { useState } from "react";
import { useTotalNoOfProductAndTotalPrice } from "../../routes/MainLogic";
import Details from "../../shared components/Details";
import { useDate, useOrder } from "./TrackOrderPageLogic";

// AICI AM RAMAS Mai fa UI la pagina asta,
export default function TrackOrderPage(props) {
  const { idOfOrder } = props;
  const { order, loaded } = useOrder(idOfOrder);

  // Show order status
  // Take difference between date of order and current time
  const { minsDiff } = useDate(idOfOrder);
  const OrderStatus = () => {
    if (minsDiff < 30) {
      return (
        <h1>
          Comanda ta este aprobata si in curs de pregatire. {50 - minsDiff} de
          minute pana la livrare
        </h1>
      );
    } else if (minsDiff < 50) {
      return (
        <h1>Comanda ta se livreaa. {50 - minsDiff} minute pana la livrare</h1>
      );
    } else {
      return <h1>Comanda ta a fost livrata</h1>;
    }
  };

  if (loaded) {
    return (
      <>
        <h1>Track Order page ID OF ORDER IS: {idOfOrder}</h1>
        <h1>Date of this order is: </h1>
        <h1>Minutes difference {minsDiff}</h1>
        <OrderStatus />
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
