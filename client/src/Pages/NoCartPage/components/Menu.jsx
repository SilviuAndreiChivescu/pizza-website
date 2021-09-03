import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import Card from "react-bootstrap/Card";

export default function Menu(props) {
  const { productsList, setShow, setContent } = props;

  return (
    <section style={{ backgroundColor: "#efeff4" }}>
      <nav className="d-flex justify-content-between bg-secondary p-3 w-100">
        <Link to="#pizza">Pizza</Link>
        <Link to="#burgari">Burgări</Link>
        <Link to="#chifle">Chifle coapte pe vatră</Link>
        <Link to="#sandwich">Sandwich</Link>
        <Link to="#bauturi">Bauturi</Link>
      </nav>
      <div className="">
        <ul className="text-dark">
          <p id="pizza" className="ps-3 fs-3 fw-bold">
            Pizza
          </p>
          <div className="d-flex flex-wrap">
            {productsList.map((val) => {
              return (
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
              );
            })}
          </div>
        </ul>
      </div>
    </section>
  );
}

// The box in which the title & price are shown in the Menu
const FoodBox = (props) => {
  const { val } = props;
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{val.Name}</Card.Title>

          <Card.Text>Description</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {val.Price} lei
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
};
