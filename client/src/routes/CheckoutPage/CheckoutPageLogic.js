import Axios from "axios";
import { useEffect } from "react";
import { useInputValues } from "../../shared components/UserDetailsInputsLogic";
import { useTotalQuantityOrTotalPrice } from "./../../AppLogic";

// Post request to Orders collection
const usePostToOrders = () => {
  const addToOrders = (
    cart,
    userDetailsStates,
    deliveryDetailsStates,
    setAppState
  ) => {
    try {
      Axios.post(`${process.env.REACT_APP_ENDPOINT}/insertIntoOrders`, {
        Cart: cart,
        UserDetails: userDetailsStates,
        DeliveryDetails: deliveryDetailsStates,
      });
      console.log("Inserted data into Orders collection!");
    } catch (err) {
      setAppState("error");
      console.log(err);
    }
  };
  return { addToOrders };
};

// Post request to Users Collection
const usePostToUsers = () => {
  const addToUsers = (userDetailsStates, setAppState) => {
    try {
      Axios.post(`${process.env.REACT_APP_ENDPOINT}/insertIntoUsers`, {
        UserDetails: userDetailsStates,
      });
    } catch (err) {
      setAppState("error");
      console.log(err);
    }
  };

  return { addToUsers };
};

// This custom hook is used to check if the user is already in Users Collection and if negative, then Add user to Users Collection
const useCheckIfUserInDb = () => {
  const { addToUsers } = usePostToUsers();

  const checkIfUserInDb = (userDetailsStates, setAppState) => {
    try {
      // Send reqeust to MongoDB to check if for this email we have data.
      Axios.get(
        `${process.env.REACT_APP_ENDPOINT}/readFromUsers/${userDetailsStates.email}`
      ).then((response) => {
        // If there is no data, then add user to Users Collection
        if (response.data.length === 0)
          addToUsers(userDetailsStates, setAppState);
      });
    } catch (err) {
      setAppState("error");
      console.log(err);
    }
  };
  return { checkIfUserInDb };
};

const useSetDefaultValues = (setAppState) => {
  // States for UserDetailsInputs
  const { userDetailsStates, setUserDetailsStates, getRequestToUsers } =
    useInputValues();

  // Set Default states for if user has data on local storage or in Users Collection
  useEffect(() => {
    // Get details from local storage if user has been ordered before from the same browser and if user ticked "remember my details" checkbox
    var localStorageData = JSON.parse(
      window.localStorage.getItem("userDetails")
    );
    // If there is data on local storage, set Input Values to it
    if (localStorageData) {
      setUserDetailsStates({
        ...userDetailsStates,
        firstName: localStorageData.firstName,
        lastName: localStorageData.lastName,
        email: localStorageData.email,
        phoneNo: localStorageData.phoneNo,
        address: localStorageData.address,
        city: localStorageData.city,
      });
    }
    // If there is nothing on local storage, send get request to Users collection
    else {
      getRequestToUsers(setAppState);
    }
  }, []);

  return {
    userDetailsStates,
    setUserDetailsStates,
  };
};

const useHandleSubmit = (cart, history) => {
  const { checkIfUserInDb } = useCheckIfUserInDb();
  const { addToOrders } = usePostToOrders();
  const { sendEmail } = useMailjetAPI(cart);

  const handleSubmit = (
    setLastOrder,
    setCart,
    userDetailsStates,
    deliveryDetailsStates,
    setAppState
  ) => {
    // If any of the inputs is empty, don't execute button functionality
    if (
      userDetailsStates.firstName === "" ||
      userDetailsStates.lastName === "" ||
      userDetailsStates.email === "" ||
      userDetailsStates.phoneNo === 0 ||
      userDetailsStates.address === "" ||
      userDetailsStates.city === "" ||
      deliveryDetailsStates.deliveryTime === "" ||
      deliveryDetailsStates.deliveryWay === "" ||
      // If checkbox with Terms not checked
      !deliveryDetailsStates.terms
    ) {
      return;
    }
    // Keep data in local storage if user ticks the checkbox
    if (deliveryDetailsStates.keepData) {
      // Create object to pass to local storage
      let data = {
        firstName: userDetailsStates.firstName,
        lastName: userDetailsStates.lastName,
        email: userDetailsStates.email,
        cart: cart,
        address: userDetailsStates.address,
        city: userDetailsStates.city,
        phoneNo: userDetailsStates.phoneNo,
        deliveryTime: deliveryDetailsStates.deliveryTime,
        deliveryWay: deliveryDetailsStates.deliveryWay,
      };
      window.localStorage.setItem("userDetails", JSON.stringify(data));
    }

    // This function checks if the user is already in Users Collection. If users is not in Users Collection, it adds it
    checkIfUserInDb(userDetailsStates, setAppState);

    // Add to Orders collection
    addToOrders(cart, userDetailsStates, deliveryDetailsStates, setAppState);

    // Last order is used for receipt page to show the order that was ordered
    setLastOrder(cart);

    // To send email with the order
    sendEmail(userDetailsStates, deliveryDetailsStates, setAppState);

    // Clean up cart state for next order
    setCart([]);

    // Redirect to Receipt Page
    history.push("/receipt");
  };
  return { handleSubmit };
};

// Mailjet API
const useMailjetAPI = (cart) => {
  // Function to calculate total price
  const { totalPrice } = useTotalQuantityOrTotalPrice(cart);
  const sendEmail = (userDetailsStates, deliveryDetailsStates, setAppState) => {
    // Create the email
    const email = {
      nameText: `${userDetailsStates.firstName} ${userDetailsStates.lastName}`,
      contactText: `${userDetailsStates.phoneNo} ${userDetailsStates.email}`,
      addressText: `${userDetailsStates.city} ${userDetailsStates.address}`,
      deliveryText: `${deliveryDetailsStates.deliveryWay} - ${deliveryDetailsStates.deliveryTime}`,
      cartText: cart
        .map((e) => {
          return `<li> ${e.Quantity} X ${e.Name} - ${e.Price} lei </li>`;
        })
        // Make it a string joined by words
        .join("")
        // Add total price at the end
        .concat(` Total plata comanda: ${totalPrice} lei`),
    };

    try {
      Axios.post(`${process.env.REACT_APP_ENDPOINT}/sendEmail`, {
        Email: email,
      });
    } catch (err) {
      setAppState("error");
      console.log(err);
    }
  };
  return { sendEmail };
};
// *** END Mailjet API ***

export { usePostToOrders, useSetDefaultValues, useHandleSubmit };
