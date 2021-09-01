import { useHistoryData } from "./HistoryLogic";

export default function History(props) {
  const { historyProductList } = useHistoryData();
  const { setPageState } = props;
  return historyProductList.map((e, idx) => {
    return (
      <div key={idx}>
        <h5>Comanda {idx}.</h5>
        <ul>
          {e.map((element, index) => {
            return <li key={index}>{element.Name}</li>;
          })}
        </ul>
        <button onClick={() => setPageState("TrackOrder")}></button>
      </div>
    );
  });
}
