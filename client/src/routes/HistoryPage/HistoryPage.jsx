import MyNavbar from "../../shared components/MyNavbar";
import History from "./History";

export default function HistoryPage(props) {
  const { setIdOfOrder, setNoCartAnimation } = props;
  return (
    <main className="page slide-in-right">
      <MyNavbar
        setAnimation={setNoCartAnimation}
        title={"Istoricul comenzilor"}
        to={"/"}
      />
      <History setIdOfOrder={setIdOfOrder} />
    </main>
  );
}
