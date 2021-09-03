import { Button } from "react-bootstrap";

export default function CustomButton(props) {
  const { title, onClick } = props;
  return (
    <Button onClick={onClick} variant="dark" type="submit">
      {title}
    </Button>
  );
}
