import MyNavbar from "../../shared components/MyNavbar";
import MyModal from "../../shared components/MyModal";

import Menu from "./components/Menu";
import CartBar from "./components/CartBar";
import ModalContent from "./components/ModalContent";

import { useState } from "react";

export default function NoCartPage(props) {
  const {
    cart,
    setCart,
    totalPrice,
    totalQuantity,
    productsList,
    noCartAnimation,
    setCartAnimation,
  } = props;

  // Content for modal
  const [content, setContent] = useState([]);

  // State to show modal
  const [show, setShow] = useState(false);

  return (
    <main className={`page `}>
      <MyNavbar title="Meniu" />
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
        name={content.Name}
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
        setCartAnimation={setCartAnimation}
      />
    </main>
  );
}
