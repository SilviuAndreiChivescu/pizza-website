import Axios from "axios";

// Post request to Orders collection // I need to refactor this to match Orders model
const usePostToOrders = () => {
  const submit = (
    firstName,
    lastName,
    email,
    cart,
    address,
    city,
    phoneNumber,
    deliveryTime,
    deliveryWay
  ) => {
    var name = firstName + " " + lastName;
    var addressAndCity = address + ", " + city;
    try {
      Axios.post("http://localhost:3001/insertIntoOrders", {
        Name: name,
        Email: email, // Think a little bit about this, when user is not logged in, it should be email from input field, either way, even if he is logged in, Auth will put his email in checkout page, so here i have to get the email as well
        Cart: cart,
        Address: addressAndCity,
        PhoneNumber: phoneNumber,
        DeliveryTime: deliveryTime,
        DeliveryWay: deliveryWay,
      });
      console.log("Inserted data into Orders collection!");
    } catch (err) {
      console.log(err);
    }
  };
  return { submit };
};

export { usePostToOrders };
