// src/components/Layout/SidebarLayout.jsx
import { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient"; // Adjust path if needed
import TopBar from "./TopBar"; // Adjust path if needed
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component
import {
  FaTachometerAlt,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SidebarLayout.css"; // Adjust path if needed

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  // Default to collapsed might be better on small screens, but keep false for now
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    // Outermost container
    <div className="d-flex flex-column min-vh-100">
      <TopBar /> {/* Your existing TopBar */}
      <div className="d-flex flex-grow-1">
        {" "}
        {/* Added flex-grow-1 */}
        {/* Sidebar */}
        <div
          // Use Bootstrap's theme-aware background utility
          className={`sidebar shadow-sm text-white ${
            collapsed ? "collapsed" : ""
          } bg-dark`} // Keep bg-dark or use theme-aware bg like bg-body-tertiary
        >
          {/* Sidebar Header */}
          <div className="p-3 d-flex justify-content-between align-items-center">
            {!collapsed && <h5 className="m-0">Job Search</h5>}
            {/* Use theme-aware button variant */}
            <button
              className="btn btn-sm btn-outline-light" // Changed button style
              onClick={toggleSidebar}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "→" : "←"}
            </button>
          </div>

          {/* Sidebar Navigation */}
          {/* Use d-flex flex-column to allow flex-grow-1 and mt-auto */}
          <Nav className="flex-column mt-2 d-flex flex-grow-1">
            {/* Dashboard Link */}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/dashboard"
                className={`sidebar-nav-link d-flex align-items-center py-3 px-3 ${
                  location.pathname === "/dashboard"
                    ? "active bg-primary text-white" // Active state
                    : "text-white" // Default state
                }`}
              >
                <FaTachometerAlt className="me-3" />
                {!collapsed && <span>Dashboard</span>}
              </Nav.Link>
            </Nav.Item>

            {/* Job Portal Link 
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
            */}

            {/* Candidate Pool Link */}
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

            {/* Job Planning Link */}
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

            {/* Profile Link */}
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

            {/* Spacer to push items below down */}
            <div className="mt-auto"></div>

            {/* Theme Toggle Item - Placed before Logout */}
            <Nav.Item className="px-3 py-2">
              {" "}
              {/* Add some padding */}
              <ThemeToggle isCollapsed={collapsed} />{" "}
              {/* Pass collapsed state */}
            </Nav.Item>

            {/* Logout Link (at the bottom) */}
            <Nav.Item>
              <Nav.Link
                onClick={async () => {
                  try {
                    await supabase.auth.signOut();
                  } catch (error) {
                    console.error("Error logging out:", error);
                  }
                }}
                className="logout-link d-flex align-items-center py-3 px-3 text-white"
                style={{ cursor: "pointer" }}
              >
                <FaSignOutAlt className="me-3" />
                {!collapsed && <span>Logout</span>}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        {/* Main Content Area */}
        <div
          className={`main-content flex-grow-1 ${collapsed ? "collapsed" : ""}`}
        >
          <Container fluid className="p-4">
            {" "}
            {/* Added padding */}
            {children}
          </Container>
        </div>
      </div>{" "}
      {/* End of inner d-flex */}
      {/* REMOVED ThemeToggle from here */}
    </div> // End of outermost container
  );
};

export default SidebarLayout;
