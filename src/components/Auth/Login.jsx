import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, getCurrentUser } from "../../supabase/supabaseClient";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      setIsRegistering(false);
      setError("Registration successful! Please login.");
    } catch (error) {
      console.error("Error registering:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await getCurrentUser();
      if (data?.user) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await signIn(email, password);
      if (error) throw error;

      if (data?.user) {
        const { data: currentUser } = await getCurrentUser();
        if (currentUser?.user) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      if (error.message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="text-center mb-4">Job Search Portal</h2>

          {error && (
            <Alert
              variant={error.includes("successful") ? "success" : "danger"}
              className="mb-3"
            >
              {error}
            </Alert>
          )}

          {isRegistering ? (
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>

              <Button
                variant="link"
                className="w-100 mt-3"
                onClick={() => setIsRegistering(false)}
              >
                Already have an account? Sign in
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Button
                variant="link"
                className="w-100 mt-3"
                onClick={() => setIsRegistering(true)}
              >
                New here? Register
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
