import { useState } from "react";

// CHANGE THIS, MOVE IT TO NOCARTPAGE.JSX BECAUSE IT'S ONLY A USEsTATE INITIALIZATION. ONLY KEEP IT IF MAYBE YOU GET MORE LOGIC FOR NOCARTPAGE

// State to display modal
const useShow = () => {
  const [show, setShow] = useState(false);
  return { show, setShow };
};

// State for content for modal
const useContent = () => {
  const [content, setContent] = useState([]);

  return { content, setContent };
};
export { useShow, useContent };
