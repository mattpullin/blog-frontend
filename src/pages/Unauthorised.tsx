import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function Unauthorised() {
  return (
    <Card className="text-center">
      <Card.Header>401 — Unauthorised</Card.Header>
      <Card.Body>
        <Card.Text>You need to be logged in to view that page.</Card.Text>
        <Button as={Link as any} to="/login" variant="primary">Go to login</Button>
      </Card.Body>
    </Card>
  );
}