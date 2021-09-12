import History from "./History";

export default function HistoryPage(props) {
  const { setPageState, setIdOfOrder } = props;
  return (
    <main className="page">
      <History setIdOfOrder={setIdOfOrder} setPageState={setPageState} />
    </main>
  );
}
