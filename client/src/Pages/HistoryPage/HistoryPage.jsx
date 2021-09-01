import History from "./History";

export default function HistoryPage(props) {
  const { setPageState } = props;
  return (
    <>
      <History setPageState={setPageState} />
    </>
  );
}
