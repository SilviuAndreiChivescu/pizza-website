import { Button } from "react-bootstrap";

export default function MyButton(props) {
  const { title, onClick, className } = props;
  return (
    <Button
      size="lg"
      className={className}
      onClick={onClick}
      variant="dark"
      type="submit"
    >
      {title}
    </Button>
  );
}
