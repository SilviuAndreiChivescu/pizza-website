import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import CustomButton from "../../pages/CheckoutPage/CustomButton";
import { useSetDefaultValues } from "../MyAccountPage/MyAccountPageLogic";

// AICI AM RAMAS, TREBUIE SA IMPLEMENTEZ UPDATE MONGODB USERS WITH INPUTS IF USER DOES THIS.
export default function MyAccountPage(props) {
  // States for User Input fields
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNo,
    setPhoneNo,
    address,
    setAddress,
    city,
    setCity,
  } = useSetDefaultValues();

  const { setPageState } = props;
  return (
    <>
      <h1>Informatii personale</h1>
      <UserDetailsInputs
        setFirstName={setFirstName}
        firstName={firstName}
        setLastName={setLastName}
        lastName={lastName}
        setEmail={setEmail}
        email={email}
        setPhoneNo={setPhoneNo}
        phoneNo={phoneNo}
        setAddress={setAddress}
        address={address}
        setCity={setCity}
        city={city}
        // readOnly is for the email input field
        readOnly={"readOnly"}
      >
        <CustomButton title={"Salveaza noile informatii"} />
      </UserDetailsInputs>
    </>
  );
}
