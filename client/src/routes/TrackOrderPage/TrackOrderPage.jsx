import { Card, Container } from "react-bootstrap";
import { useTotalNoOfProductAndTotalPrice } from "../../AppLogic";
import CustomButton from "../../shared components/CustomButton";
import Details from "../../shared components/Details";
import NavBar from "../../shared components/NavBar";
import { useDate, useOrder } from "./TrackOrderPageLogic";

export default function TrackOrderPage(props) {
  const { idOfOrder, setNoCartAnimation } = props;

  // Logic
  const { order, address, loaded } = useOrder(idOfOrder);

  // Difference between date of order and current time
  const { minsDiff } = useDate(idOfOrder);

  // Show order status ( minsDeff < 30 = cooking; minsDeff < 50 = delivery; minsDeff > 50 = delivered )
  const OrderStatus = () => {
    if (minsDiff < 30) {
      return (
        <>
          <Card.Title className="fs-2">
            Comanda ta este aprobata si in curs de pregatire.
          </Card.Title>
          <Card.Subtitle>
            {50 - minsDiff} de minute pana la livrare
          </Card.Subtitle>
        </>
      );
    } else if (minsDiff < 50) {
      return (
        <>
          <Card.Title className="fs-2">Comanda ta se livreaza.</Card.Title>
          <Card.Subtitle>{50 - minsDiff} minute pana la livrare</Card.Subtitle>
        </>
      );
    } else {
      return (
        <Card.Title className="fs-2">Comanda ta a fost livrata</Card.Title>
      );
    }
  };

  if (loaded) {
    return (
      <main className="page slide-in-right">
        <NavBar
          setAnimation={setNoCartAnimation}
          title={"Statusul comenzii"}
          to={"/"}
        />
        <Container className="text-center mt-3">
          <Card.Body>
            <OrderStatus />
          </Card.Body>
        </Container>

        {order.map((e, idx) => {
          return <CartBody e={e} address={address} />;
        })}
      </main>
    );
  } else return null;
}

// Using another component because Total Price could not have been calculated without. Calling custom hooks in return statement is not possible
const CartBody = (props) => {
  const { e, address } = props;
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(e);
  return (
    <Container>
      <Details cart={e} title="Detalii comanda" totalPrice={totalPrice}>
        <Card.Subtitle> Adresa: {address}</Card.Subtitle>
      </Details>
      <section className="text-center">
        <a href="tel:0754911062">
          <CustomButton title={`Suna-ne`} />
        </a>
      </section>
    </Container>
  );
};
