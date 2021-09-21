import { Card, Container } from "react-bootstrap";
import { useDate } from "../../AppLogic";
import MyButton from "../../shared components/MyButton";
import Details from "../../shared components/Details";
import MyNavbar from "../../shared components/MyNavbar";
import { useOrderData } from "./TrackOrderPageLogic";

export default function TrackOrderPage(props) {
  const { idOfOrder, setNoCartAnimation, setAppState } = props;

  // Logic
  const { orderData } = useOrderData(idOfOrder, setAppState);

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
  // If page refresh after seeing TrackOrderPage or going to path '/trackorder' without pressing 'Track Order' button, redirect to '/' - home page
  if (!idOfOrder) window.location.replace(process.env.REACT_APP_ENDPOINT);
  if (orderData.loaded) {
    return (
      <main className="slide-in-right">
        <MyNavbar
          setAnimation={() => setNoCartAnimation("slide-in-left")}
          title={"Status"}
          to={"/"}
        />
        <Container className="text-center mt-3">
          <Card.Body>
            <OrderStatus />
          </Card.Body>
        </Container>

        {orderData.order.map((e) => {
          return <CartBody key={e.Name} e={e} address={orderData.address} />;
        })}
      </main>
    );
  } else return null;
}

// Using another component because Total Price could not have been calculated without. Calling custom hooks in return statement is not possible
const CartBody = (props) => {
  const { e, address } = props;
  return (
    <Container>
      <Details cart={e} title="Detalii comanda">
        <Card.Subtitle> Address: {address}</Card.Subtitle>
      </Details>
      <section className="text-center mt-4">
        <a href="tel:0754911062">
          <MyButton title={`Call us`} />
        </a>
      </section>
    </Container>
  );
};
