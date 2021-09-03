import History from "./History";

export default function HistoryPage(props) {
  const { setPageState, setIdOfOrder } = props;
  return (
    <>
      <History setIdOfOrder={setIdOfOrder} setPageState={setPageState} />
    </>
  );
}
