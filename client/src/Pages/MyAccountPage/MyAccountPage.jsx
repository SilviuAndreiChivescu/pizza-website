import UserDetailsInputs from "../../shared components/UserDetailsInputs";

export default function MyAccountPage(props) {
  const { setPageState } = props;
  return (
    <>
      <h1>Informatii personale</h1>
      <UserDetailsInputs readOnly={"readOnly"} />
    </>
  );
}
