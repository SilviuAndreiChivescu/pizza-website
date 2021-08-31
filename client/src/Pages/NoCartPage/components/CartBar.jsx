import { FaShoppingBag } from "react-icons/fa";

// The cart bar at the bottom of the page.
export default function CartBar(props) {
    return (
      <section
        onClick={props.setPageState}
        style={{ cursor: "pointer", backgroundColor: "#000000" }}
        className="text-white d-flex justify-content-between container-fluid position-fixed bottom-0 pe-4 ps-3 pt-2"
      >
        <div className="row">
          <h5 className="col" style={{ backgroundColor: "#000000" }}>
            <FaShoppingBag />
          </h5>
          <h4 className="col ps-0">{props.totalNumberOfProduct}</h4>
        </div>
        <h5 className="fw-bold">Vezi cosul tau</h5>
        <h4 className="fw-bold">{props.totalPrice} lei</h4>
      </section>
    );
  }