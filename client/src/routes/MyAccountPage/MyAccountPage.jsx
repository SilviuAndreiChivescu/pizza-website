import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import CustomButton from "../../shared components/CustomButton";
import NavBar from "../../shared components/NavBar";
import {
  useSetDefaultValues,
  useUpdateUserDetails,
} from "../MyAccountPage/MyAccountPageLogic";
import { Container, Form } from "react-bootstrap";

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
  return (
    <main className="page slide-in-bck-center">
      <NavBar title="Informatii personale" to="/" />
      <Form className="m-5">
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
          <Container className="text-center">
            <CustomButton
              title={"Salveaza noile informatii"}
              className="mt-5"
              onClick={() => {
                updateUser(email, firstName, lastName, address, city, phoneNo);
                alert("Detaliile tale au fost modificate cu succes");
              }}
            />{" "}
          </Container>
        </UserDetailsInputs>
      </Form>
    </main>
  );
}
