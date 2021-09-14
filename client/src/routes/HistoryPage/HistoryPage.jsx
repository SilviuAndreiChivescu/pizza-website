import NavBar from "../../shared components/NavBar";
import History from "./History";

export default function HistoryPage(props) {
  const { setIdOfOrder, setNoCartAnimation } = props;
  return (
    <main className="page slide-in-right">
      <NavBar
        setAnimation={setNoCartAnimation}
        title={"Istoricul comenzilor"}
        to={"/"}
      />
      <History setIdOfOrder={setIdOfOrder} />
    </main>
  );
}
