import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, supabase } from "./supabase/supabaseClient";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import JobPortal from "./components/JobPortal/JobPortal";
import ApplyNow from "./components/JobPortal/ApplyNow";
import Profile from "./components/Profile/Profile";
import CandidatePool from "./pages/CandidatePool";
import SidebarLayout from "./components/Layout/SidebarLayout";

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

    // Subscribe to auth state changes
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
    return <div>Loading...</div>;
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
      <Route
        path="/dashboard"
        element={
          user ? (
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/job-portal"
        element={
          user ? (
            <SidebarLayout>
              <JobPortal />
            </SidebarLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/apply-now"
        element={
          user ? (
            <SidebarLayout>
              <ApplyNow />
            </SidebarLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          user ? (
            <SidebarLayout>
              <Profile />
            </SidebarLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/candidate-pool"
        element={
          user ? (
            <SidebarLayout>
              <CandidatePool />
            </SidebarLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthWrapper />
    </Router>
  );
}

export default App;
