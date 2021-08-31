import { useState } from "react";

// The state of Application
const useAppState = () => {
  const [appState, setAppState] = useState("loading");

  return { appState, setAppState };
};

export { useAppState };
