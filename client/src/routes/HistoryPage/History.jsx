import CustomButton from "../../shared components/CustomButton";
import { useHistoryData } from "./HistoryLogic";
import { Card, Container } from "react-bootstrap";
import { useTotalNoOfProductAndTotalPrice } from "../../AppLogic";
import { Link } from "react-router-dom";

export default function History(props) {
  const { setIdOfOrder } = props;

  // HistoryLogic
  const { historyProductList, timeOfOrder, loaded, idOfHistoryProductList } =
    useHistoryData();

  // uncomment below and the end with else, commented for dev ps
  // if (loaded) {
  return historyProductList.map((e, idx) => {
    return (
      <HistoryBody
        timeOfOrder={timeOfOrder}
        e={e}
        idx={idx}
        idOfHistoryProductList={idOfHistoryProductList}
        setIdOfOrder={setIdOfOrder}
      />
    );
  });
  // } else return <h1>Nicio comanda pt dvs</h1>;
}

const HistoryBody = (props) => {
  const { e, idx, timeOfOrder, idOfHistoryProductList, setIdOfOrder } = props;

  // Total price for particular order
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(e);

  return (
    <Container className="">
      <Card key={idx} className="m-3 p-3">
        <Card.Title>
          Comanda {idx + 1} - {totalPrice} lei
        </Card.Title>
        <Card.Subtitle>{timeOfOrder[idx]}</Card.Subtitle>
        <Card.Body>
          <strong>Continut</strong>
          <ul>
            {e.map((element, index) => {
              return (
                <li key={index}>
                  {element.Quantity} X {element.Name} {element.Price} lei
                </li>
              );
            })}
          </ul>
          <strong>Adresa de livrare</strong>
        </Card.Body>

        <Link to="/trackorder">
          <CustomButton
            title={"Urmareste comanda"}
            onClick={() => {
              setIdOfOrder(idOfHistoryProductList[idx]);
            }}
          />
        </Link>
      </Card>
    </Container>
  );
};
