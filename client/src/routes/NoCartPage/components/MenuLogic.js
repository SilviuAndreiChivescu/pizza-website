import { useEffect, useState } from "react";

const useFilteredProductsList = (productsList) => {
  // Filter the productsList by value of Search field
  const [filter, setFilter] = useState("");

  const [food, setFood] = useState({
    pizzas: [],
    burgers: [],
    chifle: [],
    sandwich: [],
    drinks: [],
  });

  // Filter the filteredProductsList for each category
  useEffect(() => {
    // Filter the entire Products Collection by the value of Search Input Field
    let filteredList = productsList.filter((e) =>
      e.Name.toLowerCase().match(filter.toLowerCase())
    );
    // Filter the pizzas
    let pizzas = filteredList.filter((e) => e.Category === "pizza");

    // Flter the burgers
    let burgers = filteredList.filter((e) => e.Category === "burgers");

    // Filter the chifles
    let chifle = filteredList.filter((e) => e.Category === "chifle");

    // Filter the sandwichs
    let sandwich = filteredList.filter((e) => e.Category === "sandwich");

    // Filter the drinks
    let drinks = filteredList.filter((e) => e.Category === "drinks");

    // Set the state
    setFood({
      ...food,
      pizzas: pizzas,
      burgers: burgers,
      chifle: chifle,
      sandwich: sandwich,
      drinks: drinks,
    });
  }, [filter]);

  return { setFilter, food };
};

export { useFilteredProductsList };
