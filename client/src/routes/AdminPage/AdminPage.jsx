import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import MyNavbar from "../../shared components/MyNavbar";

import { useProductsList } from "./AdminPageLogic";

import NewProduct from "./components/NewProduct";
import ProductsList from "./components/ProductsList";

export default function AdminPage(props) {
  // Verify if user is auth and if is admin, otherwise send to home page
  const { user, isAuthenticated } = useAuth0();
  if (
    !isAuthenticated ||
    !process.env.REACT_APP_ADMINS.split(" ").includes(user.email)
  )
    window.location.replace("/");

  const { setNoCartAnimation } = props;

  // Read from Products Collection
  const { productsList, setProductsList } = useProductsList();

  return (
    <main className="slide-in-right">
      <MyNavbar title="Admin" to="/" setAnimation={setNoCartAnimation} />
      <NewProduct
        productsList={productsList}
        setProductsList={setProductsList}
      />

      <ProductsList productsList={productsList} />
    </main>
  );
}
