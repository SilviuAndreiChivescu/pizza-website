import NavBar from "../../shared components/NavBar";
import Menu from "./components/Menu";
import CartBar from "./components/CartBar";

import Modal from "../../shared components/Modal/Modal";
import "../../shared components/Modal/Modal.css";
import ModalContent from "./components/ModalContent";
import { useContent, useShow } from "./NoCartPageLogic";

export default function NoCartPage(props) {
  const {
    pageState,
    setPageState,
    cart,
    setCart,
    totalPrice,
    totalNumberOfProduct,
    productsList,
  } = props;

  // Content for modal
  const { content, setContent } = useContent();

  // State to show modal
  const { show, setShow } = useShow();

  return (
    <>
      <NavBar
        title={"Orice comanda va fi confirmata in 5 minute."}
        pageState={pageState}
        setPageState={setPageState}
      />
      <Menu
        cart={cart}
        setCart={(e) => setCart(e)}
        totalPrice={totalPrice}
        totalNumberOfProduct={totalNumberOfProduct}
        productsList={productsList}
        setShow={setShow}
        setContent={setContent}
      />
      <Modal
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
      </Modal>
      <CartBar
        totalPrice={totalPrice}
        totalNumberOfProduct={totalNumberOfProduct}
        setPageState={() => setPageState("Cart")}
      />
    </>
  );
}
