import { Button } from "react-bootstrap";

export default function SubmitButton(props) {
  const { title, onClick } = props;
  return (
    <Button onClick={onClick} variant="dark" type="submit">
      {title}
    </Button>
  );
}
