import MyButton from "../../shared components/MyButton";
import { useHistoryData } from "./HistoryLogic";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useTotalQuantityOrTotalPrice, useDate } from "../../AppLogic";
import { Link } from "react-router-dom";

export default function History(props) {
  const { setIdOfOrder, setAppState } = props;

  // HistoryLogic
  const { historyData } = useHistoryData(setAppState);

  // If has loaded
  if (historyData.loaded) {
    // If there is data
    if (historyData.historyProductList.length !== 0)
      return historyData.historyProductList.map((e, idx) => {
        return (
          <HistoryBody
            key={historyData.idOfHistoryProductList[idx]}
            timeOfOrder={historyData.timeOfOrder}
            e={e}
            idx={idx}
            idOfHistoryProductList={historyData.idOfHistoryProductList}
            setIdOfOrder={setIdOfOrder}
          />
        );
      });
    // If no data
    else return <h1>Nicio comanda pt dvs</h1>;
    // If can't make the request
  } else return <h1>A aparut o eroare, va rugam sa dati refresh.</h1>;
}

const HistoryBody = (props) => {
  const { e, idx, timeOfOrder, idOfHistoryProductList, setIdOfOrder } = props;

  // Total price for particular order
  const { totalPrice } = useTotalQuantityOrTotalPrice(e);

  // Minutes difference between current order and current time
  const { minsDiff } = useDate(idOfHistoryProductList[idx]);

  return (
    <Container key={idOfHistoryProductList[idx]} className="">
      <Row className="justify-content-center">
        <Col xs={14} sm={12} md={10} lg={8} xl={8} xxl={9}>
          <Card key={idx} className="m-3 p-3">
            <Card.Title>
              Comanda {idx + 1} &nbsp; - &nbsp; {totalPrice} lei
            </Card.Title>
            <Card.Subtitle>{timeOfOrder[idx]}</Card.Subtitle>
            <Card.Body>
              <strong>Continut </strong>
              <ListGroup className="p-2" as="ul">
                {e.map((element) => {
                  return (
                    <ListGroup.Item className="mb-3" as="li" key={element.Name}>
                      {element.Quantity} &nbsp; X &nbsp; {element.Name} &nbsp;{" "}
                      {element.Price} lei
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>

            {/* If less than 100 minutes have passed, show "Track order" Button. Otherwise, show "Leave reveiw" Button */}
            {minsDiff < 100 ? (
              <Link style={{ margin: "0 auto" }} to="/trackorder">
                <MyButton
                  title={"Urmareste comanda"}
                  onClick={() => {
                    setIdOfOrder(idOfHistoryProductList[idx]);
                  }}
                />
              </Link>
            ) : (
              <a
                style={{ margin: "0 auto" }}
                href="https://www.facebook.com/pizzamedievalmangalia/reviews"
                target="_blank"
                rel="noreferrer"
              >
                <MyButton title={"Lasa-ne un review"} onClick={() => {}} />
              </a>
            )}
            {/*  */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
