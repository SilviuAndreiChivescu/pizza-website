import { useEffect, useState } from "react";

const useFilteredProductsList = (productsList) => {
  // Filter the productsList by value of Search field
  const [filter, setFilter] = useState("");

  const [pizzas, setPizzas] = useState("");
  const [burgers, setBurgers] = useState("");

  // Filter the filteredProductsList for each category

  useEffect(() => {
    // Filter the entire Products Collection by the value of Search Input Field
    let filteredList = productsList.filter((e) =>
      e.Name.toLowerCase().match(filter)
    );
    // Filter the pizzas
    let pizzas = filteredList.filter((e) => e.Category === "pizza");
    setPizzas(pizzas);

    // Flter the burgers
    let burgers = filteredList.filter((e) => e.Category === "burgari");
    setBurgers(burgers);
  }, [filter]);

  return { setFilter, pizzas, burgers };
};

export { useFilteredProductsList };
