import NavBar from "../components/NavBar";
import MainMenu from "../components/MainMenu";

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

  return (
    <>
      <NavBar
        title={"Orice comanda va fi confirmata in 5 minute."}
        pageState={pageState}
        setPageState={setPageState}
      />
      <MainMenu
        cart={cart}
        setCart={(e) => setCart(e)}
        totalPrice={totalPrice}
        totalNumberOfProduct={totalNumberOfProduct}
        productsList={productsList}
        setPageState={() => setPageState("Cart")}
      />
    </>
  );
}
