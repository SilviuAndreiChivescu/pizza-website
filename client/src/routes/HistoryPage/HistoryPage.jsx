import NavBar from "../../shared components/NavBar";
import History from "./History";

// AM RAMAS AICI, SA FAC UI AND SHIT, REMEMBER TO PUT NAVBAR AND EVERYTHING. GOODLUCK
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
