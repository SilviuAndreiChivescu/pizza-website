import { Image } from "react-bootstrap";

// This component is used as Brand for React Bootstrap Navbar's Brand and for Loading component
export default function Brand() {
  return (
    <Image
      className="d-inline p-2 ms-2"
      src="images/brandLogo.png"
      alt="medieval pizza logo"
    ></Image>
  );
}
