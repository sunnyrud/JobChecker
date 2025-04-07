import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className={`bg-dark text-white ${collapsed ? "collapsed" : ""}`}
        style={{
          width: collapsed ? "80px" : "250px",
          transition: "width 0.3s ease",
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          zIndex: 1000,
        }}
      >
        {/* Sidebar Header */}
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

        {/* Sidebar Navigation */}
        <Nav className="flex-column mt-2">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`d-flex align-items-center py-3 px-3 ${
                location.pathname === "/dashboard"
                  ? "active bg-primary text-white"
                  : "text-white"
              }`}
              style={{ color: "#ffffff" }}
            >
              <FaTachometerAlt className="me-3" />
              {!collapsed && <span>Dashboard</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/job-portal"
              className={`d-flex align-items-center py-3 px-3 ${
                location.pathname === "/job-portal"
                  ? "active bg-primary text-white"
                  : "text-white"
              }`}
              style={{ color: "#ffffff" }}
            >
              <FaBriefcase className="me-3" />
              {!collapsed && <span>Job Portal</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/candidate-pool"
              className={`d-flex align-items-center py-3 px-3 ${
                location.pathname === "/candidate-pool"
                  ? "active bg-primary text-white"
                  : "text-white"
              }`}
              style={{ color: "#ffffff" }}
            >
              <FaUsers className="me-3" />
              {!collapsed && <span>Candidate Pool</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/present-trends"
              className={`d-flex align-items-center py-3 px-3 ${
                location.pathname === "/present-trends"
                  ? "active bg-primary text-white"
                  : "text-white"
              }`}
              style={{ color: "#ffffff" }}
            >
              <FaChartLine className="me-3" />
              {!collapsed && <span>Present Trends</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/profile"
              className={`d-flex align-items-center py-3 px-3 ${
                location.pathname === "/profile"
                  ? "active bg-primary text-white"
                  : "text-white"
              }`}
              style={{ color: "#ffffff" }}
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
              className="d-flex align-items-center py-3 px-3 text-white"
              style={{ cursor: "pointer", color: "#ffffff" }}
            >
              <FaSignOutAlt className="me-3" />
              {!collapsed && <span>Logout</span>}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: collapsed ? "80px" : "250px",
          width: `calc(100% - ${collapsed ? "80px" : "250px"})`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <Container fluid className="p-0">
          {children}
        </Container>
      </div>
    </div>
  );
};

export default SidebarLayout;
