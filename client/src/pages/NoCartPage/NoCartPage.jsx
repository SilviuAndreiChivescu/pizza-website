import NavBar from "../../shared components/NavBar";
import Menu from "./components/Menu";
import CartBar from "./components/CartBar";

import MyModal from "../../shared components/MyModal";
import ModalContent from "./components/ModalContent";
import { useContent, useShow } from "./NoCartPageLogic";

export default function NoCartPage(props) {
  const {
    setPageState,
    cart,
    setCart,
    totalPrice,
    totalQuantity,
    productsList,
  } = props;

  // Content for modal
  const { content, setContent } = useContent();

  // State to show modal
  const { show, setShow } = useShow();

  return (
    <>
      <NavBar title={<TitleForNavbar />} setPageState={setPageState} />
      <Menu
        cart={cart}
        setCart={setCart}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        productsList={productsList}
        setShow={setShow}
        setContent={setContent}
      />
      <MyModal
        Name={content.Name}
        onClose={() => setShow((currShow) => !currShow)}
        show={show}
      >
        <ModalContent
          cart={cart}
          setCart={setCart}
          content={content}
          onClose={() => setShow((currShow) => !currShow)}
        />
      </MyModal>
      <CartBar
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        setPageState={() => setPageState("Cart")}
      />
    </>
  );
}

// This component is used as title parameter for <NavBar />
const TitleForNavbar = () => {
  return (
    <img
      className="d-inline p-2 ms-2"
      src="https://medievalpizza.com/wp-content/uploads/2021/04/omgggg.png"
      alt="medieval pizza logo"
    ></img>
  );
};
