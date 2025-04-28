// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, supabase } from "./supabase/supabaseClient"; // Adjust path if needed
import Login from "./components/Auth/Login"; // Adjust path if needed
import Dashboard from "./components/Dashboard/Dashboard"; // Adjust path if needed
import JobPortal from "./components/JobPortal/JobPortal"; // Adjust path if needed
import ApplyNow from "./components/JobPortal/ApplyNow"; // Adjust path if needed
import Profile from "./components/Profile/Profile"; // Adjust path if needed
import CandidatePool from "./pages/CandidatePool"; // Adjust path if needed
import JobPlanning from "./components/JobPlanning/JobPlanning"; // Adjust path if needed
import SidebarLayout from "./components/Layout/SidebarLayout"; // Adjust path if needed
import { ThemeProvider } from "./context/ThemeContext"; // Import the ThemeProvider

// --- AuthWrapper remains the same ---
function AuthWrapper() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await getCurrentUser();
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    // Consider a more styled loading indicator
    return <div className="vh-100 d-flex justify-content-center align-items-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />
      {/* Protected Routes using SidebarLayout */}
      <Route
        path="/dashboard"
        element={ user ? <SidebarLayout><Dashboard /></SidebarLayout> : <Navigate to="/login" /> }
      />
      <Route
        path="/job-portal"
        element={ user ? <SidebarLayout><JobPortal jobsData={[]} /></SidebarLayout> : <Navigate to="/login" /> } // Pass empty array or fetch data here if needed standalone
      />
      <Route
        path="/apply-now"
        element={ user ? <SidebarLayout><ApplyNow /></SidebarLayout> : <Navigate to="/login" /> }
      />
      <Route
        path="/job-planning"
        element={ user ? <SidebarLayout><JobPlanning /></SidebarLayout> : <Navigate to="/login" /> }
      />
      <Route
        path="/profile"
        element={ user ? <SidebarLayout><Profile /></SidebarLayout> : <Navigate to="/login" /> }
      />
      <Route
        path="/candidate-pool"
        element={ user ? <SidebarLayout><CandidatePool /></SidebarLayout> : <Navigate to="/login" /> }
      />
      {/* Add a catch-all or 404 route if needed */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

function App() {
  return (
    // Wrap the entire application with ThemeProvider
    <ThemeProvider>
      <Router>
        <AuthWrapper />
      </Router>
    </ThemeProvider>
  );
}

export default App;

