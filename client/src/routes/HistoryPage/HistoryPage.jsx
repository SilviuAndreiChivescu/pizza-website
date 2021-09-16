import MyNavbar from "../../shared components/MyNavbar";
import History from "./History";

export default function HistoryPage(props) {
  const { setIdOfOrder, setNoCartAnimation, setAppState } = props;
  return (
    <main className="page slide-in-right">
      <MyNavbar setAnimation={setNoCartAnimation} title={"Istoric"} to={"/"} />
      <History setAppState={setAppState} setIdOfOrder={setIdOfOrder} />
    </main>
  );
}
