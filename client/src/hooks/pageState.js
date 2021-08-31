import { useState } from "react";

// The state of Application
const usePageState = () => {
  const [pageState, setPageState] = useState("NoCart");

  return { pageState, setPageState };
};

export { usePageState };
