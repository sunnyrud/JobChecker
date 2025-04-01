// src/pages/Dashboard.jsx (or wherever it lives)
import { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  signOut,
  getCurrentUser,
  getUserProfile,
} from "../../supabase/supabaseClient"; // Adjusted path if needed
import "bootstrap/dist/css/bootstrap.min.css";

// Import data and components
import { sampleJobs, getUniqueValues } from "../jobs"; // Adjust path
import JobFilters from "../JobFilters"; // Adjust path
import JobList from "../JobList"; // Adjust path

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: null, email: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allJobs] = useState(sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);
  const [filters, setFilters] = useState({
    role: "",
    city: "All",
    jobType: "All",
  });

  const uniqueCities = getUniqueValues(allJobs, "city");
  const uniqueJobTypes = getUniqueValues(allJobs, "jobType");

  // --- Effect for User Data Fetching ---
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      let profileUsername = null;
      let profileEmail = null;

      try {
        const { data: authUserData, error: userError } = await getCurrentUser();
        if (userError)
          throw new Error(`Could not fetch user session: ${userError.message}`);
        if (!authUserData?.user) {
          console.log("No user session found, potentially redirecting...");
          // navigate('/'); // Consider redirecting if auth is strictly required to view dashboard
          throw new Error("No active user session found.");
        }
        profileEmail = authUserData.user.email;

        try {
          const { data: profileData, error: profileError } =
            await getUserProfile(authUserData.user.id);
          if (
            profileError &&
            profileError.message !==
              "JSON object requested, multiple (or no) rows returned"
          ) {
            console.warn("Could not fetch user profile:", profileError.message);
          }
          if (profileData) {
            profileUsername = profileData.username;
          }
        } catch (profileFetchError) {
          console.warn("Error fetching profile:", profileFetchError.message);
        }
        setUserData({ username: profileUsername, email: profileEmail });
      } catch (err) {
        console.error("Dashboard loading error:", err);
        setError(err.message);
        // Attempt to set email even if other parts fail
        setUserData((prev) => ({
          ...prev,
          username: null,
          email: prev.email || profileEmail,
        }));
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []); // Removed navigate dependency if not needed

  // --- Effect for Filtering Jobs ---
  useEffect(() => {
    let result = allJobs.filter((job) => {
      const roleMatch =
        filters.role === "" ||
        job.role.toLowerCase().includes(filters.role.toLowerCase().trim());
      const cityMatch = filters.city === "All" || job.city === filters.city;
      const jobTypeMatch =
        filters.jobType === "All" || job.jobType === filters.jobType;
      return roleMatch && cityMatch && jobTypeMatch;
    });
    setFilteredJobs(result);
  }, [filters, allJobs]);

  // --- Handlers ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ role: "", city: "All", jobType: "All" });
  };

  const handleLogout = async () => {
    const { error: logoutError } = await signOut();
    if (!logoutError) {
      navigate("/");
    } else {
      console.error("Logout failed:", logoutError.message);
      alert(`Logout failed: ${logoutError.message}`);
    }
  };

  // --- Display Name Logic ---
  const displayName = userData.username || userData.email || "Profile";
  const welcomeName =
    userData.username || (userData.email ? userData.email.split("@")[0] : "");

  return (
    // ***** ADDED Flexbox styling here *****
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* --- Navbar --- */}
      {/* ***** ADDED flex-shrink-0 here ***** */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm flex-shrink-0">
        <Container>
          <Navbar.Brand href="/dashboard">Job Search Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavDropdown
                title={isLoading ? "Loading..." : displayName}
                id="basic-nav-dropdown"
                disabled={isLoading}
              >
                <NavDropdown.Item onClick={() => navigate("/profile-settings")}>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* --- Main Content --- */}
      {/* ***** ADDED flex-grow-1 and mb-4 here ***** */}
      <Container className="flex-grow-1 mb-4">
        {/* User Loading/Error */}
        {isLoading && (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        )}
        {error && !isLoading && (
          <Alert variant="danger" className="my-3">
            Error: {error}
          </Alert>
        )}

        {/* Content when user loaded */}
        {!isLoading && !error && (
          <>
            <h2 className="mb-4">
              Welcome{welcomeName ? `, ${welcomeName}` : ""}! Find your next
              job.
            </h2>

            {/* Render Filter Component */}
            <JobFilters
              filters={filters}
              uniqueCities={uniqueCities}
              uniqueJobTypes={uniqueJobTypes}
              handleFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />

            {/* Render Job List Component */}
            <JobList jobs={filteredJobs} />
          </>
        )}
      </Container>
      {/* Optional Footer could go here */}
    </div>
  );
};

export default Dashboard;
