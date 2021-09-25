import Card from "react-bootstrap/Card";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Image,
} from "react-bootstrap";

import Brand from "./../../../shared components/Brand";

import { useFilteredProductsList } from "./MenuLogic";

export default function Menu(props) {
  const { productsList, setShow, setContent } = props;

  // To filter the productsList
  const { setFilter, food } = useFilteredProductsList(productsList);

  // Render only if the filteredFoodList is empty
  const NoItemMatch = () => {
    if (food.pizzas.length === 0)
      return (
        <Container style={{ height: "70vh" }} className="mb-5 text-center">
          <Card.Title>Sorry but we don't have that product!</Card.Title>
        </Container>
      );
    else return null;
  };

  return (
    <>
      <Container fluid className="p-0">
        <Image fluid src="images/menu_image.jpg"></Image>

        <Navbar bg="light" expand="xl">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className=" justify-content-center"
              id="basic-navbar-nav"
            >
              <Navbar.Brand>
                <Brand />
              </Navbar.Brand>
              <Form className="d-flex me-4">
                <FormControl
                  onChange={(e) => setFilter(e.target.value)}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </Form>
              <Nav className="rajdhani">
                <Nav.Link href="#pizza">Pizza</Nav.Link>
              </Nav>
              <Nav className="rajdhani">
                <Nav.Link href="#pizza">Burgers</Nav.Link>
              </Nav>
              <Nav className="rajdhani">
                <Nav.Link href="#pizza">Drinks</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <Container fluid style={{ backgroundColor: "#efeff4" }}>
        {/* If the filtered list is empty, render this component */}
        <NoItemMatch />
        {/* Category component can be found below */}
        <Category
          title={"Pizza"}
          id={"pizza"}
          mapOver={food.pizzas}
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
      <Container className="mb-5">
        <Card.Title className="ephesis noPointerEvents" id={id}>
          {title}
        </Card.Title>

        <section className="d-flex flex-wrap justify-content-center mt-1">
          {mapOver.map((val) => {
            return (
              <section
                key={val._id}
                onClick={() => {
                  setShow((currShow) => !currShow);
                  setContent({
                    Name: val.Name,
                    Description: val.Description,
                    Price: val.Price,
                    Category: val.Category,
                    Image: val.Image,
                  });
                }}
                className={"m-4"}
              >
                <FoodBox val={val} />
              </section>
            );
          })}
        </section>
      </Container>
    </>
  );
};

// The box in which the title & price are shown in the Menu
const FoodBox = (props) => {
  const { val } = props;
  const imageSrc = `images/${val.Image}.jpg`;

  return (
    <>
      <Card className="grow cursor" style={{ width: "17rem", height: "22rem" }}>
        <Card.Img
          style={{ height: "11rem" }}
          variant="top"
          src={imageSrc}
          alt={val.Image.split("_").join(" ")}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = ``;
          }}
        />
        <Card.Body>
          <Card.Title>{val.Name} </Card.Title>
          <Card.Subtitle className="mb-2">
            {/* [0] - because Pizza has 3 sizes, first option is the smallest and default for the others with only one option */}
            &#163; {val.Price[0]}
          </Card.Subtitle>
          <Card.Subtitle style={{ height: "5rem" }} className="mt-2 text-muted">
            {val.Description}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};
