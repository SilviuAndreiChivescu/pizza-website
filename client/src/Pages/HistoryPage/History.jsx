import CustomButton from "../CheckoutPage/CustomButton";
import { useHistoryData } from "./HistoryLogic";
import { Card } from "react-bootstrap";
import { useTotalNoOfProductAndTotalPrice } from "../../routes/MainLogic";

export default function History(props) {
  const { historyProductList, timeOfOrder, loaded } = useHistoryData();
  const { setPageState } = props;
  if (loaded) {
    return historyProductList.map((e, idx) => {
      return (
        <HistoryBody
          timeOfOrder={timeOfOrder}
          e={e}
          idx={idx}
          setPageState={setPageState}
        />
      );
    });
  } else return null;
}

const HistoryBody = (props) => {
  const { e, idx, setPageState, timeOfOrder } = props;
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
        <p>{e._id}</p>
      </Card.Body>

      <CustomButton
        title={"Urmareste comanda"}
        onClick={() => setPageState("TrackOrder")}
      />
    </Card>
  );
};
