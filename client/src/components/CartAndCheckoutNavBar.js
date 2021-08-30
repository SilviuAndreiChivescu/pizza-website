import Drawer from "./Drawer";

export default function CartAndCheckoutNavBar(props) {
  return (
    <header className="black-bg container-fluid d-inline-flex justify-content-between pe-3 ps-3 text-white">
      <h5
        style={{ cursor: "pointer" }}
        onClick={() => props.setPageState("Cart")}
        className="fs-1"
      >
        &#8592;
      </h5>
      <h5 className="pt-3 me-3">{props.title}</h5>
      <Drawer
        setPageState={() => props.setPageState("history")}
        Icon={<i className="fas fa-lg text-white fa-bars ms-5"></i>}
      />
    </header>
  );
}
