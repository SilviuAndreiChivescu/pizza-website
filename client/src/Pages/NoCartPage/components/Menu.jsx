import React from "react";

export default function Menu(props) {
  const { productsList, setShow, setContent } = props;

  return (
    <section style={{ backgroundColor: "#efeff4" }}>
      <nav className="d-flex justify-content-between bg-secondary p-3 w-100">
        <a href="#pizza">Pizza</a>
        <a href="#">Burgări</a>
        <a href="#chifle">Chifle coapte pe vatră</a>
        <a href="#">Sandwich</a>
        <a href="#">Sucuri si Bere</a>
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
                  style={{ width: "250px" }}
                  className="p-3 m-1 bg-white text-dark shadow bg-body rounded"
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
      <li key={"props.key"} className="fw-bold">
        {val.Name}
      </li>
      <p style={{ height: "120px" }} className="text-secondary mt-2 mb-2">
        Description
      </p>
      <p className="fw-bolder mb-0 ">{val.Price} lei</p>
    </>
  );
};
