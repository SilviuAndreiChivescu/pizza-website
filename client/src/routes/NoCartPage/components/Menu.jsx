import Card from "react-bootstrap/Card";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Image,
} from "react-bootstrap";
import { useFilteredProductsList } from "./MenuLogic";

export default function Menu(props) {
  const { productsList, setShow, setContent } = props;

  // To filter the productsList
  const { setFilter, pizzas, burgers } = useFilteredProductsList(productsList);

  return (
    <>
      <Navbar bg="light" expand="xl">
        <Container>
          <Navbar.Brand>
            <Brand />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex">
              <FormControl
                onChange={(e) => setFilter(e.target.value)}
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
            </Form>
            <Nav className="me-auto">
              <Nav.Link href="#pizza">Pizza</Nav.Link>
              <Nav.Link href="#burgari">Burgări</Nav.Link>
              <Nav.Link href="#chifle">Chifle coapte pe vatră</Nav.Link>
              <Nav.Link href="#sandwich">Sandwich</Nav.Link>
              <Nav.Link href="#bauturi">Bauturi</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid style={{ backgroundColor: "#efeff4" }}>
        {/* Category component can be found below */}
        <Category
          title={"Pizza"}
          id={"pizza"}
          mapOver={pizzas}
          setShow={setShow}
          setContent={setContent}
        />
        <Category
          title={"Burgari"}
          id={"burgari"}
          mapOver={burgers}
          setShow={setShow}
          setContent={setContent}
        />
      </Container>
    </>
  );
}

// This component is to show particular type of food in menu
const Category = ({ title, id, mapOver, setShow, setContent }) => {
  if (mapOver.length === 0) return null;
  return (
    <>
      <Card.Body id={id}>{title}</Card.Body>
      <div className="d-flex flex-wrap">
        {mapOver.map((val) => {
          return (
            <>
              <div
                onClick={() => {
                  setShow((currShow) => !currShow);
                  setContent({
                    Name: val.Name,
                    Price: val.Price,
                    Category: val.Category,
                  });
                }}
                className={"m-4"}
              >
                <FoodBox key={val._id} val={val} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

// The box in which the title & price are shown in the Menu
const FoodBox = (props) => {
  const { val } = props;
  return (
    <>
      <Card style={{ width: "12rem" }}>
        <Card.Body>
          <Card.Title>{val.Name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {/* [0] - because Pizza has 3 sizes, first option is the smallest and default for the others with only one option */}
            {val.Price[0]} lei
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};

// This component is used as Brand for React Bootstrap Navbar's Brand
const Brand = () => {
  return (
    <Image
      className="d-inline p-2 ms-2"
      src="https://medievalpizza.com/wp-content/uploads/2021/04/omgggg.png"
      alt="medieval pizza logo"
    ></Image>
  );
};
