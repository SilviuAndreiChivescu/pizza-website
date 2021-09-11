import CustomButton from "../../shared components/CustomButton";
import { useHistoryData } from "./HistoryLogic";
import { Card } from "react-bootstrap";
import { useTotalNoOfProductAndTotalPrice } from "../../AppLogic";
import { Link } from "react-router-dom";

export default function History(props) {
  const { historyProductList, timeOfOrder, loaded, idOfHistoryProductList } =
    useHistoryData();
  const { setIdOfOrder } = props;
  if (loaded) {
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
  } else return <h1>Nicio comanda pt dvs</h1>;
}

const HistoryBody = (props) => {
  const { e, idx, timeOfOrder, idOfHistoryProductList, setIdOfOrder } = props;
  // Calculate total price for particular order using this custom hook
  const { totalPrice } = useTotalNoOfProductAndTotalPrice(e);

  return (
    <Card key={idx} className={"m-3"}>
      <Card.Title>
        Comanda {idx + 1} - {totalPrice} lei
      </Card.Title>
      <Card.Subtitle>{timeOfOrder[idx].toString()}</Card.Subtitle>
      <Card.Body>
        Continut
        <ul>
          {e.map((element, index) => {
            return (
              <li key={index}>
                {element.Quantity} X {element.Name} {element.Price} lei
              </li>
            );
          })}
        </ul>
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
  );
};
