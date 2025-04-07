import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { supabase } from "../../supabase/supabaseClient";

const TopBar = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };
    getUserEmail();
  }, []);

  const extractNameFromEmail = (email) => {
    if (!email) return "";
    return email.split("@")[0].split(".").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  return (
    <Navbar bg="white" className="shadow-sm" fixed="top">
      <Container fluid>
        <Navbar.Brand className="fw-bold text-primary">JobPortal</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center">
          <div className="d-flex align-items-center">
            <FaUserCircle size={24} className="text-primary me-2" />
            <span className="fw-medium">{extractNameFromEmail(userEmail)}</span>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopBar;