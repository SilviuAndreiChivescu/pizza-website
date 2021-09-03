import UserDetailsInputs from "../../shared components/UserDetailsInputs";
import CustomButton from "../../pages/CheckoutPage/CustomButton";

export default function MyAccountPage(props) {
  const { setPageState } = props;
  return (
    <>
      <h1>Informatii personale</h1>
      <UserDetailsInputs readOnly={"readOnly"}>
        <CustomButton title={"Salveaza noile informatii"} />
      </UserDetailsInputs>
    </>
  );
}
