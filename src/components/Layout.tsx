import type { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Alert } from "react-bootstrap";
import { logout } from "../api/client";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const flash = (location.state as { message?: string } | null)?.message;

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Assignment 3 COSC360/COSC560
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>

              {!token ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={userName ?? "Admin User"}
                  align="end"
                  id="navbarDropdown"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="py-4">
        <Container>
          {flash && (
            <Alert variant="success" dismissible>
              {flash}
            </Alert>
          )}
          {children}
        </Container>
      </main>

      <footer className="text-center text-muted py-3 border-top">
        <small>
          &copy; {new Date().getFullYear()} Assignment 3 COSC360/COSC560
        </small>
      </footer>
    </>
  );
}
