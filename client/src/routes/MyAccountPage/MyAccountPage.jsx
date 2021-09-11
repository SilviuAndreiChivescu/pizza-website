import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import CustomButton from "../../shared components/CustomButton";
import {
  useSetDefaultValues,
  useUpdateUserDetails,
} from "../MyAccountPage/MyAccountPageLogic";

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

  // Function to update user details in Users Collection
  const { updateUser } = useUpdateUserDetails();
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
        <CustomButton
          title={"Salveaza noile informatii"}
          onClick={() => {
            updateUser(email, firstName, lastName, address, city, phoneNo);
            alert("Detaliile tale au fost modificate cu succes");
          }}
        />
      </UserDetailsInputs>
    </>
  );
}
