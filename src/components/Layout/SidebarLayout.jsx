import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import TopBar from "./TopBar";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SidebarLayout.css";

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopBar />
      <div className="d-flex">
        <div
          className={`sidebar bg-dark text-white ${
            collapsed ? "collapsed" : ""
          }`}
        >
          <div className="p-3 d-flex justify-content-between align-items-center">
            {!collapsed && <h5 className="m-0">Job Search</h5>}
            <button
              className="btn btn-sm btn-dark"
              onClick={toggleSidebar}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "→" : "←"}
            </button>
          </div>

          <Nav className="flex-column mt-2">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/dashboard"
                className={`sidebar-nav-link d-flex align-items-center py-3 px-3 ${
                  location.pathname === "/dashboard"
                    ? "active bg-primary text-white"
                    : "text-white"
                }`}
              >
                <FaTachometerAlt className="me-3" />
                {!collapsed && <span>Dashboard</span>}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/job-portal"
                className={`sidebar-nav-link d-flex align-items-center py-3 px-3 ${
                  location.pathname === "/job-portal"
                    ? "active bg-primary text-white"
                    : "text-white"
                }`}
              >
                <FaBriefcase className="me-3" />
                {!collapsed && <span>Job Portal</span>}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/candidate-pool"
                className={`sidebar-nav-link d-flex align-items-center py-3 px-3 ${
                  location.pathname === "/candidate-pool"
                    ? "active bg-primary text-white"
                    : "text-white"
                }`}
              >
                <FaUsers className="me-3" />
                {!collapsed && <span>Candidate Pool</span>}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/job-planning"
                className={`sidebar-nav-link d-flex align-items-center py-3 px-3 ${
                  location.pathname === "/job-planning"
                    ? "active bg-primary text-white"
                    : "text-white"
                }`}
              >
                <FaClipboardList className="me-3" />
                {!collapsed && <span>Job Planning</span>}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/profile"
                className={`sidebar-nav-link d-flex align-items-center py-3 px-3 ${
                  location.pathname === "/profile"
                    ? "active bg-primary text-white"
                    : "text-white"
                }`}
              >
                <FaUser className="me-3" />
                {!collapsed && <span>Profile</span>}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                onClick={async () => {
                  try {
                    await supabase.auth.signOut();
                    window.location.href = "/login";
                  } catch (error) {
                    console.error("Error logging out:", error);
                  }
                }}
                className="logout-link d-flex align-items-center py-3 px-3 text-white"
              >
                <FaSignOutAlt className="me-3" />
                {!collapsed && <span>Logout</span>}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
          <Container fluid className="p-0">
            {children}
          </Container>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
