import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import CustomButton from "../../shared components/CustomButton";
import MyNavbar from "../../shared components/MyNavbar";
import {
  useSetDefaultValues,
  useUpdateUserDetails,
} from "../MyAccountPage/MyAccountPageLogic";
import { Container, Form } from "react-bootstrap";

export default function MyAccountPage(props) {
  const { setNoCartAnimation } = props;

  // States for User Input fields
  const { userDetailsStates, setUserDetailsStates } = useSetDefaultValues();

  // Function to update user details in Users Collection
  const { updateUser } = useUpdateUserDetails();
  return (
    <main className="page slide-in-right">
      <MyNavbar
        title="Informatii personale"
        to="/"
        setAnimation={setNoCartAnimation}
      />
      <Form className="m-5">
        <UserDetailsInputs
          userDetailsStates={userDetailsStates}
          setUserDetailsStates={setUserDetailsStates}
          // readOnly is for the email input field
          readOnly={"readOnly"}
        >
          <Container className="text-center">
            <CustomButton
              title={"Salveaza noile informatii"}
              className="mt-5"
              onClick={() => {
                updateUser(userDetailsStates);
                alert("Detaliile tale au fost modificate cu succes");
              }}
            />{" "}
          </Container>
        </UserDetailsInputs>
      </Form>
    </main>
  );
}
