import { useLocation } from "react-router-dom";

export default function Whoops404() {
  let location = useLocation();

  return (
    <main>
      <h1>Resource not found at {location.pathname}!</h1>
    </main>
  );
}
