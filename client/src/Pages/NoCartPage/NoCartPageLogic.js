import { useState } from "react";

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
